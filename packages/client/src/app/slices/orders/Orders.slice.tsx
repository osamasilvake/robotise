import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeOrders } from '../../utilities/serializers/json-api/Orders.deserialize';
import { AppReducerType } from '..';
import { OrdersContentInterface, OrdersInterface } from './Orders.slice.interface';

// initial state
export const initialState: OrdersInterface = {
	loader: false,
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Orders',
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
			state.content = state.content
				? handlePaginationState(state.content, action.payload)
				: action.payload;
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
export const ordersSelector = (state: AppReducerType) => state['orders'];

// reducer
export default dataSlice.reducer;

/**
 * fetch orders
 * @param robotId
 * @param pageNo
 * @param rowsPerPage
 * @param refresh
 * @returns
 */
export const OrdersFetchList = (
	robotId: string,
	pageNo: number,
	rowsPerPage: number,
	refresh = false
) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
	// states
	const states = getState();
	const orders = states.orders;

	// return on busy
	if (orders && (orders.loader || orders.loading)) {
		return;
	}

	// dispatch: loader/loading
	dispatch(!refresh ? loader() : loading());

	return RobotsService.robotOrdersFetch(robotId, pageNo, rowsPerPage)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeOrders(res);

			// dispatch: success
			dispatch(
				success({
					...result,
					meta: { ...result.meta, rowsPerPage: rowsPerPage },
					robot: { id: robotId }
				})
			);
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'fetch-orders-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: failure
			dispatch(failure(message));
		});
};

/**
 * organize robots state to handle pagination
 * @param state
 * @param action
 * @returns
 */
const handlePaginationState = (state: OrdersContentInterface, action: OrdersContentInterface) => {
	const condition1 = action.meta.page > 1; // first page
	const condition2 = action.meta.nextPage > state.meta.nextPage; // between pages
	const condition3 = action.meta.nextPage === null; // last page
	if (condition1 && (condition2 || condition3)) {
		action.meta.nextPage = condition3 ? state.meta.page + 1 : action.meta.nextPage;
		return {
			...state,
			meta: {
				...state.meta,
				...action.meta
			},
			data: [...state.data, ...action.data],
			dataById: {
				...state.dataById,
				...action.dataById
			}
		};
	}
	return action;
};
