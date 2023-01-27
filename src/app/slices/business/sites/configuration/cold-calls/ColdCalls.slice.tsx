import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import { SiteConfigurationColdCallsFormInterface } from '../../../../../screens/business/sites/content/configuration/cold-calls/SiteConfigurationColdCalls.interface';
import SitesService from '../../../../../screens/business/sites/Sites.service';
import { timeout } from '../../../../../utilities/methods/Timeout';
import { RootState } from '../../../..';
import { triggerMessage } from '../../../../app/App.slice';
import { deserializeColdCalls } from './ColdCalls.slice.deserialize';
import { CCContentInterface, SliceColdCallsInterface } from './ColdCalls.slice.interface';

// initial state
export const initialState: SliceColdCallsInterface = {
	init: false,
	loader: false,
	loading: false,
	updating: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Cold Calls',
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
export const coldCallsSelector = (state: RootState) => state['coldCalls'];

// reducer
export default dataSlice.reducer;

/**
 * fetch cold calls locations
 * @param siteId
 * @param refresh
 * @returns
 */
export const SiteColdCallsLocationsFetchList =
	(siteId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const coldCalls = states.coldCalls;

		// return on busy
		if (coldCalls && (coldCalls.loader || coldCalls.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return SitesService.siteColdCallsLocationsFetch(siteId)
			.then(async (res) => {
				// deserialize response
				const result: CCContentInterface = await deserializeColdCalls(res);

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
					id: 'cold-calls-locations-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * update cold calls locations
 * @param siteId
 * @param coldCallId
 * @param locations
 * @returns
 */
export const SiteColdCallsLocationsUpdate =
	(siteId: string, coldCallId: string, locations: string[]) => async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		// update cold calls
		return SitesService.siteColdCallsLocationsUpdate(siteId, coldCallId, locations)
			.then(async () => {
				// dispatch: updated
				dispatch(updated());
			})
			.catch(() => {
				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * update cold calls
 * @param siteId
 * @param payload
 * @param callback
 * @returns
 */
export const SiteColdCallsUpdate =
	(siteId: string, payload: SiteConfigurationColdCallsFormInterface, callback?: () => void) =>
	async (dispatch: Dispatch) => {
		// dispatch: updating
		dispatch(updating());

		// update cold calls
		return SitesService.siteColdCallsUpdate(siteId, payload)
			.then(async () => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'cold-calls-update-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'SITES.CONFIGURATION.COLD_CALLS.UPDATE.SUCCESS'
				};
				dispatch(triggerMessage(message));

				// dispatch: updated
				dispatch(updated());

				// wait
				await timeout(1000);

				// callback
				callback && callback();
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'cold-calls-update-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.CONFIGURATION.COLD_CALLS.UPDATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};
