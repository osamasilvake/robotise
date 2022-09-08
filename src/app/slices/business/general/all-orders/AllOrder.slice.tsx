import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import GeneralService from '../../../../screens/business/general/General.service';
import { RootState } from '../../..';
import { deserializeAllOrder } from './AllOrder.slice.deserialize';
import { SliceAllOrderInterface } from './AllOrder.slice.interface';
import { mapOrder } from './AllOrder.slice.map';

// initial state
export const initialState: SliceAllOrderInterface = {
	init: false,
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'All Order',
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
export const allOrderSelector = (state: RootState) => state['allOrder'];

// reducer
export default dataSlice.reducer;

/**
 * fetch order
 * @param orderId
 * @param refresh
 * @returns
 */
export const AllOrderFetch =
	(orderId: string, refresh = false) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		// states
		const states = getState();
		const allOrder = states.allOrder;

		// return on busy
		if (allOrder && (allOrder.loader || allOrder.loading)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return GeneralService.generalAllOrderFetch(orderId)
			.then(async (res) => {
				// deserialize response
				const order = await deserializeAllOrder(res);

				// prepare order content
				const result = mapOrder(order);

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'all-order-fetch-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};
