import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import {
	DialogEditPhoneConfigFormInterface,
	SitePhoneConfigUploadAudioInterface
} from '../../../../screens/business/sites/content/phone-configs/detail/general/SitePhoneConfigsGeneral.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../utilities/methods/Timeout';
import { RootState } from '../../..';
import { triggerMessage } from '../../../app/App.slice';
import { deserializePhoneConfigs } from './PhoneConfigs.slice.deserialize';
import { PCContentInterface, SlicePhoneConfigsInterface } from './PhoneConfigs.slice.interface';

// initial state
export const initialState: SlicePhoneConfigsInterface = {
	init: false,
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
		updated: (state) => {
			state.updating = false;
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
export const phoneConfigsSelector = (state: RootState) => state['phoneConfigs'];

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
	async (dispatch: Dispatch, getState: () => RootState) => {
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

/**
 * edit phone config
 * @param phoneConfigId
 * @param payload
 * @param callback
 * @returns
 */
export const PhoneConfigEdit =
	(phoneConfigId: string, payload: DialogEditPhoneConfigFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.sitePhoneConfigEdit(phoneConfigId, payload)
			.then(async () => {
				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: updated
				dispatch(updated());

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'phone-config-edit-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.PHONE_CONFIGS.EDIT.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'phone-config-edit-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.PHONE_CONFIGS.EDIT.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: updateFailed
				dispatch(updateFailed());
			});
	};

/**
 * upload phone config audio
 * @param phoneConfigId
 * @param payload
 * @param callback
 * @returns
 */
export const PhoneConfigUploadAudio =
	(phoneConfigId: string, payload: SitePhoneConfigUploadAudioInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		return SitesService.sitePhoneConfigUploadAudio(phoneConfigId, payload)
			.then(async () => {
				// callback
				callback();

				// wait
				await timeout(1000);

				// dispatch: updated
				dispatch(updated());

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'phone-config-upload-audio-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.PHONE_CONFIGS.UPLOAD_AUDIO.SUCCESS'
				};
				dispatch(triggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'phone-config-upload-audio-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.PHONE_CONFIGS.UPLOAD_AUDIO.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: updateFailed
				dispatch(updateFailed());
			});
	};
