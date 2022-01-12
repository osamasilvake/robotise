import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { AppReducerType } from '../../..';
import { deserializePhoneConfigs } from './PhoneConfigs.slice.deserialize';
import { PCContentInterface, SlicePhoneConfigsInterface } from './PhoneConfigs.slice.interface';

// initial state
export const initialState: SlicePhoneConfigsInterface = {
	init: false,
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Phone Configs',
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
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, reset } = dataSlice.actions;

// selector
export const phoneConfigsSelector = (state: AppReducerType) => state['phoneConfigs'];

// reducer
export default dataSlice.reducer;

/**
 * fetch site phone configs
 * @param siteId
 * @param refresh
 * @returns
 */
export const PhoneConfigsFetch =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const phoneConfigs = states.phoneConfigs;

		// return on busy
		if (phoneConfigs && (phoneConfigs.loader || phoneConfigs.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch site phone configs
		return SitesService.sitePhoneConfigsFetch(siteId)
			.then(async (res) => {
				// deserialize response
				let result: PCContentInterface = await deserializePhoneConfigs(res);

				// set state
				result = {
					...result,
					state: {
						pSiteId: siteId
					}
				};

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'phone-configs-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
