import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializePurchase } from '../../utilities/serializers/json-api/Purchase.deserialize';
import { AppReducerType } from '..';
import { SlicePurchaseInterface } from './Purchase.slice.interface';

// initial state
export const initialState: SlicePurchaseInterface = {
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Purchase',
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
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, reset } = dataSlice.actions;

// selector
export const purchaseSelector = (state: AppReducerType) => state['purchase'];

// reducer
export default dataSlice.reducer;

/**
 * fetch purchase
 * @param purchaseId
 * @param refresh
 * @returns
 */
export const PurchaseFetch =
	(purchaseId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const purchase = states.purchase;

		// return on busy
		if (purchase && (purchase.loader || purchase.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotPurchaseFetch(purchaseId)
			.then(async (res) => {
				// deserialize response
				const result = await deserializePurchase(res);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				const message: TriggerMessageInterface = {
					id: 'fetch-purchase-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'API.FETCH'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
