import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SiteSMSListPayloadInterface } from '../../../../screens/business/sites/content/sms-list/SiteSMSList.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { RootState } from '../../..';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializeSMSList } from './SMSList.slice.deserialize';
import {
	SLContentInterface,
	SLCStateInterface,
	SliceSMSListInterface
} from './SMSList.slice.interface';
import { combineTwoLists, fillUpDummyValues } from './SMSList.slice.map';

// initial state
export const initialState: SliceSMSListInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'SMS List',
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
export const smsListSelector = (state: RootState) => state['smsList'];

// reducer
export default dataSlice.reducer;

/**
 * fetch site SMS list
 * @param siteId
 * @param payload
 * @param refresh
 * @returns
 */
export const SMSListFetchList =
	(siteId: string, payload: SiteSMSListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const smsList = states.smsList;

		// return on busy
		if (smsList && (smsList.loader || smsList.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch site SMS list
		return Promise.all([
			SitesService.siteSMSListInboundFetch(siteId, payload),
			SitesService.siteSMSListOutboundFetch(siteId, payload)
		])
			.then(async (res) => {
				// deserialize response
				const result1: SLContentInterface = await deserializeSMSList(res[0]);
				const result2: SLContentInterface = await deserializeSMSList(res[1]);

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
						pSiteId: siteId
					}
				};

				// handle refresh and pagination
				if (smsList && smsList.content) {
					result = handleRefreshAndPagination(
						smsList.content,
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
					id: 'sms-list-fetch-error',
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
export const SMSListUpdateState =
	(state: SLCStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const smsList = states.smsList;

		// dispatch: updating
		dispatch(updating());

		if (smsList && smsList.content) {
			const result = {
				...smsList.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
