import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { AppReducerType } from '../../..';
import { deserializePhoneConfigs } from './PhoneConfigs.deserialize';
import { PCContentInterface, SlicePhoneConfigsInterface } from './PhoneConfigs.slice.interface';

// initial state
export const initialState: SlicePhoneConfigsInterface = {
	loader: false,
	loading: false,
	updating: false,
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
		updateFailed: (state) => {
			state.updating = false;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, updateFailed, reset } =
	dataSlice.actions;

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
export const SitePhoneConfigsFetch =
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
				const result: PCContentInterface = await deserializePhoneConfigs(res);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-phone-configs-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
