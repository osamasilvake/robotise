import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { SitePerformancePurchasesPayloadInterface } from '../../../../screens/business/sites/content/performance/SitePerformance.interface';
import SitesService from '../../../../screens/business/sites/Sites.service';
import { RootState } from '../../..';
import { triggerMessage } from '../../../app/App.slice';
import { deserializePurchases } from './Performance.slice.deserialize';
import { PerformanceTypeEnum } from './Performance.slice.enum';
import { SlicePerformanceInterface } from './Performance.slice.interface';

// initial state
export const initialState: SlicePerformanceInterface = {
	purchases: {
		init: false,
		loader: false,
		loading: false,
		content: null,
		errors: null
	}
};

// slice
const dataSlice = createSlice({
	name: 'Performance',
	initialState,
	reducers: {
		loader: (state, action) => {
			const { module } = action.payload;
			if (module === PerformanceTypeEnum.PURCHASES) {
				state.purchases.loader = true;
			}
		},
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === PerformanceTypeEnum.PURCHASES) {
				state.purchases.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === PerformanceTypeEnum.PURCHASES) {
				state.purchases.init = true;
				state.purchases.loader = false;
				state.purchases.loading = false;
				state.purchases.content = response;
				state.purchases.errors = null;
			}
		},
		failure: (state, action) => {
			const { module, response } = action.payload;
			if (module === PerformanceTypeEnum.PURCHASES) {
				state.purchases.init = true;
				state.purchases.loader = false;
				state.purchases.loading = false;
				state.purchases.content = null;
				state.purchases.errors = response;
			}
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
 * fetch purchases
 * @param payload
 * @param refresh
 * @returns
 */
export const PerformanceFetchPurchases =
	(payload: SitePerformancePurchasesPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const purchases = states.performance.purchases;
		const state = {
			module: PerformanceTypeEnum.PURCHASES
		};

		// return on busy
		if (purchases && purchases.loading) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader(state) : loading(state));

		return SitesService.sitePerformancePurchasesFetch(payload)
			.then(async (res) => {
				// deserialize response
				const result = await deserializePurchases(res);

				// dispatch: success
				dispatch(success({ ...state, response: result }));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'performance-purchases-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'SITES.PERFORMANCE.PURCHASES.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: failure
				dispatch(failure({ state, response: message }));
			});
	};
