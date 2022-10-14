import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SitePhoneCallsListPayloadInterface } from '../../../../screens/business/sites/content/phone-calls/list/SitePhoneCallsList.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { RootState } from '../../..';
import { handleRefreshAndPagination } from '../../../Slices.map';
import { deserializePhoneCalls } from './PhoneCalls.slice.deserialize';
import { PhoneCallsTypeEnum } from './PhoneCalls.slice.enum';
import {
	PCContentInterface,
	PCCStateInterface,
	SlicePhoneCallsInterface
} from './PhoneCalls.slice.interface';

// initial state
export const initialState: SlicePhoneCallsInterface = {
	init: false,
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
export const phoneCallsSelector = (state: RootState) => state['phoneCalls'];

// reducer
export default dataSlice.reducer;

/**
 * fetch site phone calls
 * @param siteId
 * @param payload
 * @param refresh
 * @returns
 */
export const PhoneCallsFetchList =
	(siteId: string, payload: SitePhoneCallsListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
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
		return Promise.all([
			SitesService.sitePhoneCallsInboundFetch(siteId, payload),
			SitesService.sitePhoneCallsOutboundFetch(siteId, payload)
		])
			.then(async (res) => {
				// deserialize response
				const result1: PCContentInterface = await deserializePhoneCalls(res[0]);
				const result2: PCContentInterface = await deserializePhoneCalls(res[1]);

				const typeInbound = PhoneCallsTypeEnum.INBOUND;
				const typeOutbound = PhoneCallsTypeEnum.OUTBOUND;
				let result: PCContentInterface = {
					data: [
						...(result1.data?.map((d) => ({ ...d, type: typeInbound })) || []),
						...(result2.data?.map((d) => ({ ...d, type: typeOutbound })) || [])
					],
					meta: {
						...result1.meta,
						totalPages: result1.meta.totalPages + result2.meta.totalPages,
						totalDocs: result1.meta.totalDocs + result2.meta.totalDocs
					}
				};

				// set state
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
					id: 'phone-calls-fetch-error',
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
export const PhoneCallsUpdateState =
	(state: PCCStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
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
