import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import SitesService from '../../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../../utilities/methods/Timeout';
import { RootState } from '../../../..';
import { triggerMessage } from '../../../../app/App.slice';
import { deserializeSiteConfiguration } from './SiteConfiguration.slice.deserialize';
import {
	SCCDataElementInterface,
	SliceSiteConfigurationInterface
} from './SiteConfiguration.slice.interface';

// initial state
export const initialState: SliceSiteConfigurationInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Site Configuration',
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
export const siteConfigurationSelector = (state: RootState) => state['siteConfiguration'];

// reducer
export default dataSlice.reducer;

/**
 * fetch site configuration
 * @param siteId
 * @param refresh
 * @returns
 */
export const SiteConfigurationFetch =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const siteConfiguration = states.siteConfiguration;

		// return on busy
		if (siteConfiguration && (siteConfiguration.loader || siteConfiguration.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch site configuration
		return SitesService.siteConfigurationFetch(siteId)
			.then(async (res) => {
				// deserialize response
				let result = await deserializeSiteConfiguration(res);

				result = {
					data: result,
					pSiteId: siteId
				};

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-configuration-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update site configuration
 * @param siteId
 * @param configId
 * @param payload
 * @param callback
 * @returns
 */
export const SiteConfigurationUpdate =
	(siteId: string, configId: string, payload: SCCDataElementInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		// update site configuration
		return SitesService.siteConfigurationUpdate(siteId, configId, payload)
			.then(async () => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-configuration-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.SITE_CONFIGURATION.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: updated
				dispatch(updated());

				// wait
				await timeout(1000);

				// callback
				callback();
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'site-configuration-update-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.SITE_CONFIGURATION.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};
