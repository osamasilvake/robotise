import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SiteWifiHeatmapPayloadInterface } from '../../../../screens/business/sites/content/statistics/SiteStatistics.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { AppReducerType } from '../../..';
import { triggerMessage } from '../../../general/General.slice';
import { deserializeWifiHeatmap } from './WifiHeatmap.slice.deserialize';
import { SliceWifiHeatmapInterface } from './WifiHeatmap.slice.interface';

// initial state
export const initialState: SliceWifiHeatmapInterface = {
	loader: false,
	loading: false,
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
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, reset } = dataSlice.actions;

// selector
export const wifiHeatmapSelector = (state: AppReducerType) => state['wifiHeatmap'];

// reducer
export default dataSlice.reducer;

/**
 * fetch wifi data for heatmap
 * @param siteId
 * @param payload
 * @param refresh
 * @returns
 */
export const WifiHeatmapDataFetch =
	(siteId: string, payload: SiteWifiHeatmapPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const wifiHeatmap = states.wifiHeatmap;

		// return on busy
		if (wifiHeatmap && (wifiHeatmap.loader || wifiHeatmap.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return SitesService.siteWifiHeatmapDataFetch(siteId, payload)
			.then(async (res) => {
				// deserialize response
				const result = await deserializeWifiHeatmap(res);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'service-wifi-heatmap-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.STATISTICS.WIFI_HEATMAP.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure());
			});
	};
