import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SiteWifiHeatmapPayloadInterface } from '../../../../screens/business/sites/content/statistics/SiteStatistics.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { RootState } from '../../..';
import { triggerMessage } from '../../../app/App.slice';
import { deserializeWifiHeatmap } from './WifiHeatmap.slice.deserialize';
import {
	SliceWifiHeatmapInterface,
	SWCMapsInterface,
	SWCMapsStateInterface
} from './WifiHeatmap.slice.interface';
import { sortMapsContent } from './WifiHeatmap.slice.map';

// initial state
export const initialState: SliceWifiHeatmapInterface = {
	loader: false,
	loading: false,
	updating: false,
	content: null
};

// slice
const dataSlice = createSlice({
	name: 'Wifi Heatmap',
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
		},
		failure: (state) => {
			state.loader = false;
			state.loading = false;
			state.content = null;
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
export const wifiHeatmapSelector = (state: RootState) => state['wifiHeatmap'];

// reducer
export default dataSlice.reducer;

/**
 * fetch sites maps
 * @param siteId
 * @param callback
 * @returns
 */
export const WifiMapsFetch =
	(siteId: string, callback?: (res: SWCMapsInterface) => void) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const wifiHeatmap = states.wifiHeatmap;

		// return on busy
		if (wifiHeatmap && (wifiHeatmap.loader || wifiHeatmap.loading)) {
			return;
		}

		// dispatch: loader
		dispatch(loader());

		// fetch maps
		return SitesService.siteMapsFetch(siteId)
			.then(async (res) => {
				// result
				const maps: SWCMapsInterface = await deserializeWifiHeatmap(res);

				// sort
				const sorted = sortMapsContent(maps);

				// result
				const result = {
					maps: {
						...maps,
						data: sorted,
						state: {
							pSiteId: siteId,
							floor: sorted && sorted[0]?.floor,
							name: sorted && sorted[0]?.name
						}
					}
				};

				// dispatch: success
				dispatch(success(result));

				// callback
				callback && callback(result.maps);
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'wifi-maps-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.STATISTICS.HEATMAP.MAPS.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure());
			});
	};

/**
 * fetch wifi heatmap
 * @param siteId
 * @param payload
 * @param refresh
 * @returns
 */
export const WifiHeatmapFetch =
	(siteId: string, payload: SiteWifiHeatmapPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const wifiHeatmap = states.wifiHeatmap;

		// return on busy
		if (wifiHeatmap && (wifiHeatmap.loader || wifiHeatmap.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		// fetch wifi heatmap
		return SitesService.siteWifiHeatmapFetch(siteId, payload)
			.then(async (res) => {
				// deserialize
				let result = await deserializeWifiHeatmap(res);

				// result
				result = {
					...wifiHeatmap.content,
					data: result?.data
				};

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'wifi-heatmap-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.STATISTICS.HEATMAP.CONTENT.ERROR'
				};
				dispatch(triggerMessage(message));
			});
	};

/**
 * update heatmap state
 * @param state
 * @returns
 */
export const WifiHeatmapState =
	(state: SWCMapsStateInterface) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const content = states.wifiHeatmap.content;

		// dispatch: updating
		dispatch(updating());

		if (content && content.maps) {
			const result = {
				...content,
				maps: {
					...content.maps,
					state
				}
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};
