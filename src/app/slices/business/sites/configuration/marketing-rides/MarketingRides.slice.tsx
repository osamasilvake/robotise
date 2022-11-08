import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import { SiteConfigurationMarketingRidesFormInterface } from '../../../../../screens/business/sites/content/configuration/marketing-rides/SiteConfigurationMarketingRides.interface';
import SitesService from '../../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../../utilities/methods/Timeout';
import { RootState } from '../../../..';
import { triggerMessage } from '../../../../app/App.slice';
import { deserializeMarketingRides } from './MarketingRides.slice.deserialize';
import {
	SliceMarketingRidesInterface,
	SMRContentInterface
} from './MarketingRides.slice.interface';

// initial state
export const initialState: SliceMarketingRidesInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Marketing Rides',
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
export const marketingRidesSelector = (state: RootState) => state['marketingRides'];

// reducer
export default dataSlice.reducer;

/**
 * fetch marketing rides
 * @param siteId
 * @param refresh
 * @returns
 */
export const SiteMarketingRidesFetchList =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const marketingRides = states.marketingRides;

		// return on busy
		if (marketingRides && (marketingRides.loader || marketingRides.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return SitesService.siteMarketingRidesFetch(siteId)
			.then(async (res) => {
				// deserialize response
				const result: SMRContentInterface = await deserializeMarketingRides(res);

				// dispatch: success
				dispatch(
					success({
						...result,
						state: {
							pSiteId: siteId
						}
					})
				);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'marketing-rides-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update marketing rides
 * @param siteId
 * @param payload
 * @param callback
 * @returns
 */
export const SiteMarketingRidesUpdate =
	(siteId: string, payload: SiteConfigurationMarketingRidesFormInterface, callback: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		// update marketing rides
		return SitesService.siteMarketingRidesUpdate(siteId, payload)
			.then(async () => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'marketing-rides-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.MARKETING_RIDES.UPDATE.SUCCESS'
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
					id: 'marketing-rides-update-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.MARKETING_RIDES.UPDATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};
