import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SitePerformancePayloadInterface } from '../../../../screens/business/sites/content/performance/SitePerformance.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { RootState } from '../../..';
import { deserializePurchases } from './Performance.slice.deserialize';
import {
	SlicePerformanceInterface,
	SPContentInventoryInterface,
	SPContentPurchasesInterface
} from './Performance.slice.interface';

// initial state
export const initialState: SlicePerformanceInterface = {
	init: false,
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Performance',
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
export const performanceSelector = (state: RootState) => state['performance'];

// reducer
export default dataSlice.reducer;

/**
 * fetch performance
 * @param payload
 * @param refresh
 * @returns
 */
export const PerformanceFetch =
	(payload: SitePerformancePayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const performance = states.performance;

		// return on busy
		if (performance && (performance.loader || performance.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return Promise.all([
			SitesService.sitePerformancePurchasesFetch(payload),
			SitesService.sitePerformanceInventoryFetch(payload)
		])
			.then(async (res) => {
				// deserialize response
				const purchases: SPContentPurchasesInterface = await deserializePurchases(res[0]);
				const inventory: SPContentInventoryInterface = await deserializePurchases(res[1]);

				// result
				const result = {
					purchases,
					inventory
				};

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'performance-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
