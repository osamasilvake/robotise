import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { RootState } from '../../..';
import { deserializePurchase } from './Purchase.slice.deserialize';
import { SlicePurchaseInterface } from './Purchase.slice.interface';

// initial state
export const initialState: SlicePurchaseInterface = {
	init: false,
	loader: false,
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
		success: (state, action) => {
			state.init = true;
			state.loader = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.init = true;
			state.loader = false;
			state.content = null;
			state.errors = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, success, failure, reset } = dataSlice.actions;

// selector
export const purchaseSelector = (state: RootState) => state['purchase'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot purchase
 * @param purchaseId
 * @returns
 */
export const PurchaseFetch =
	(purchaseId: string) => async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const purchase = states.purchase;

		// return on busy
		if (purchase && purchase.loader) {
			return;
		}

		// dispatch: loader
		dispatch(loader());

		return RobotsService.robotPurchaseFetch(purchaseId)
			.then(async (res) => {
				// deserialize response
				const result = await deserializePurchase(res);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'purchase-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
