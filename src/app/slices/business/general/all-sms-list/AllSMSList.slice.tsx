import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { GeneralAllSMSListPayloadInterface } from '../../../../screens/business/general/all-sms-list/list/GeneralAllSMSList.interface';
import GeneralService from '../../../../screens/business/general/General.service';
import { RootState } from '../../..';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializeAllSMSList } from './AllSMSList.slice.deserialize';
import {
	ASLContentInterface,
	ASLStateInterface,
	SliceAllSMSListInterface
} from './AllSMSList.slice.interface';
import { combineTwoLists, fillUpDummyValues } from './AllSMSList.slice.map';

// initial state
export const initialState: SliceAllSMSListInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'All SMS List',
	initialState,
	reducers: {
		loader: (state) => {
			state.loader = true;
		},
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.init = true;
			state.loader = false;
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.init = true;
			state.loader = false;
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		updating: (state) => {
			state.updating = true;
		},
		updated: (state, action) => {
			state.updating = false;
			state.content = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, reset } = dataSlice.actions;

// selector
export const allSMSListSelector = (state: RootState) => state['allSMSList'];

// reducer
export default dataSlice.reducer;

/**
 * fetch all SMS list
 * @param payload
 * @param refresh
 * @returns
 */
export const AllSMSListFetchList =
	(payload: GeneralAllSMSListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allSMSList = states.allSMSList;

		// return on busy
		if (allSMSList && (allSMSList.loader || allSMSList.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch all SMS list
		return Promise.all([
			GeneralService.generalAllSMSListInboundFetch(payload),
			GeneralService.generalAllSMSListOutboundFetch(payload)
		])
			.then(async (res) => {
				// deserialize response
				const result1: ASLContentInterface = await deserializeAllSMSList(res[0]);
				const result2: ASLContentInterface = await deserializeAllSMSList(res[1]);

				// combine two lists
				let result = combineTwoLists(result1, result2);

				// fill dummies
				result =
					result?.data?.length && !!result?.meta?.nextPage
						? fillUpDummyValues(result, payload.rowsPerPage)
						: result;

				// set state
				result = {
					...result,
					state: {
						...payload,
						siteId: payload.siteId
					}
				};

				// handle refresh and pagination
				if (allSMSList && allSMSList.content) {
					result = handleRefreshAndPagination(
						allSMSList.content,
						result,
						refresh,
						payload.rowsPerPage
					);
				}

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'all-sms-list-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update state
 * @param state
 * @returns
 */
export const AllSMSListUpdateState =
	(state: ASLStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allSMSList = states.allSMSList;

		// dispatch: updating
		dispatch(updating());

		if (allSMSList && allSMSList.content) {
			const result = {
				...allSMSList.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
