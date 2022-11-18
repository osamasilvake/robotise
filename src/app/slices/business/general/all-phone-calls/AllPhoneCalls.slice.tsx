import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { GeneralAllPhoneCallsListPayloadInterface } from '../../../../screens/business/general/all-phone-calls/list/GeneralAllPhoneCallsList.interface';
import GeneralService from '../../../../screens/business/general/General.service';
import { RootState } from '../../..';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializeAllPhoneCalls } from './AllPhoneCalls.slice.deserialize';
import {
	APCContentInterface,
	APCStateInterface,
	SliceAllPhoneCallsInterface
} from './AllPhoneCalls.slice.interface';
import { combineTwoLists, fillUpDummyValues } from './AllPhoneCalls.slice.map';

// initial state
export const initialState: SliceAllPhoneCallsInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'All Phone Calls',
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
export const allPhoneCallsSelector = (state: RootState) => state['allPhoneCalls'];

// reducer
export default dataSlice.reducer;

/**
 * fetch all phone calls
 * @param payload
 * @param refresh
 * @returns
 */
export const AllPhoneCallsFetchList =
	(payload: GeneralAllPhoneCallsListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allPhoneCalls = states.allPhoneCalls;

		// return on busy
		if (allPhoneCalls && (allPhoneCalls.loader || allPhoneCalls.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch all phone calls
		return Promise.all([
			GeneralService.generalAllPhoneCallsInboundFetch(payload),
			GeneralService.generalAllPhoneCallsOutboundFetch(payload)
		])
			.then(async (res) => {
				// deserialize response
				const result1: APCContentInterface = await deserializeAllPhoneCalls(res[0]);
				const result2: APCContentInterface = await deserializeAllPhoneCalls(res[1]);

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
				if (allPhoneCalls && allPhoneCalls.content) {
					result = handleRefreshAndPagination(
						allPhoneCalls.content,
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
					id: 'all-phone-calls-fetch-error',
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
export const AllPhoneCallsUpdateState =
	(state: APCStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allPhoneCalls = states.allPhoneCalls;

		// dispatch: updating
		dispatch(updating());

		if (allPhoneCalls && allPhoneCalls.content) {
			const result = {
				...allPhoneCalls.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
