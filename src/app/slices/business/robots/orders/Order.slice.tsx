import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { AppReducerType } from '../../..';
import { deserializeOrder } from './Order.slice.deserialize';
import { SliceOrderInterface } from './Order.slice.interface';
import { mapOrder } from './Order.slice.map';

// initial state
export const initialState: SliceOrderInterface = {
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Order',
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
export const orderSelector = (state: AppReducerType) => state['order'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot order
 * @param orderId
 * @param refresh
 * @returns
 */
export const OrderFetch =
	(orderId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const order = states.order;

		// return on busy
		if (order && (order.loader || order.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotOrderFetch(orderId)
			.then(async (res) => {
				// deserialize response
				const order = await deserializeOrder(res);

				// prepare order content
				const result = mapOrder(order);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'order-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
