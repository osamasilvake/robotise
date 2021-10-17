import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SitePhoneCallsListPayloadInterface } from '../../../../screens/business/sites/content/phone-calls/list/SitePhoneCallsList.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { AppReducerType } from '../../..';
import { deserializePhoneCalls } from './PhoneCalls.deserialize';
import {
	PCContentInterface,
	PCCStateInterface,
	SlicePhoneCallsInterface
} from './PhoneCalls.slice.interface';

// initial state
export const initialState: SlicePhoneCallsInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Phone Calls',
	initialState,
	reducers: {
		loader: (state) => {
			state.loader = true;
		},
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
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
export const phoneCallsSelector = (state: AppReducerType) => state['phoneCalls'];

// reducer
export default dataSlice.reducer;

/**
 * fetch site phone calls
 * @param siteId
 * @param payload
 * @param refresh
 * @returns
 */
export const SitePhoneCallsFetchList =
	(siteId: string, payload: SitePhoneCallsListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const phoneCalls = states.phoneCalls;

		// return on busy
		if (phoneCalls && (phoneCalls.loader || phoneCalls.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch site phone calls
		return SitesService.sitePhoneCallsFetch(siteId)
			.then(async (res) => {
				// deserialize response
				let result: PCContentInterface = await deserializePhoneCalls(res);

				// state
				result = {
					...result,
					state: {
						...payload,
						pSiteId: siteId
					}
				};

				// handle refresh and pagination
				if (phoneCalls && phoneCalls.content) {
					result = handleRefreshAndPagination(
						phoneCalls.content,
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
					id: 'fetch-phone-calls-error',
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
export const SitePhoneCallsUpdateState =
	(state: PCCStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const phoneCalls = states.phoneCalls;

		// dispatch: updating
		dispatch(updating());

		if (phoneCalls && phoneCalls.content) {
			const result = {
				...phoneCalls.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};

/**
 * handle refresh and pagination
 * @param current
 * @param result
 * @param refresh
 * @param rowsPerPage
 * @returns
 */
const handleRefreshAndPagination = (
	current: PCContentInterface,
	result: PCContentInterface,
	refresh: boolean,
	rowsPerPage: number
) => {
	if (refresh) {
		const dataItems = current.data.slice(rowsPerPage);
		return {
			...current,
			data: [...result.data, ...dataItems],
			meta: current.meta && {
				...current.meta,
				totalDocs: result.meta.totalDocs,
				totalPages: result.meta.totalPages
			}
		};
	} else if (result?.meta?.page > 1) {
		return {
			...current,
			meta: {
				...current.meta,
				...result.meta
			},
			data: [...current.data, ...result.data]
		};
	}
	return result;
};
