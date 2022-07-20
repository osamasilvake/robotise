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
		loader: false,
		loading: false,
		content: null
	}
};

// slice
const dataSlice = createSlice({
	name: 'Performance',
	initialState,
	reducers: {
		loading: (state, action) => {
			const { module } = action.payload;
			if (module === PerformanceTypeEnum.PURCHASES) {
				state.purchases.loading = true;
			}
		},
		success: (state, action) => {
			const { module, response } = action.payload;
			if (module === PerformanceTypeEnum.PURCHASES) {
				state.purchases.loading = false;
				state.purchases.content = response;
			}
		},
		failure: (state, action) => {
			const { module } = action.payload;
			if (module === PerformanceTypeEnum.PURCHASES) {
				state.purchases.loading = false;
				state.purchases.content = null;
			}
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const performanceSelector = (state: RootState) => state['performance'];

// reducer
export default dataSlice.reducer;

/**
 * fetch purchases
 * @returns
 */
export const PerformanceFetchPurchases =
	(payload: SitePerformancePurchasesPayloadInterface) =>
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

		// dispatch: loading
		dispatch(loading(state));

		return SitesService.sitePerformancePurchasesFetch(payload)
			.then(async (res) => {
				// deserialize response
				const result = await deserializePurchases(res);

				// dispatch: success
				dispatch(success({ ...state, response: result }));

				return result;
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
				dispatch(failure(state));

				return null;
			});
	};
