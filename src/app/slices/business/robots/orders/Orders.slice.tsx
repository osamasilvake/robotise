import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { DialogCreateOrderFormInterface } from '../../../../screens/business/robots/content/orders/list/actions/RobotOrdersActions.interface';
import { RobotOrdersListPayloadInterface } from '../../../../screens/business/robots/content/orders/list/RobotOrdersList.interface';
import RobotsService from '../../../../screens/business/robots/Robots.service';
import { AppReducerType } from '../../..';
import { triggerMessage } from '../../../general/General.slice';
import { deserializeOrder } from './Order.deserialize';
import { deserializeOrders } from './Orders.deserialize';
import {
	SliceOrdersInterface,
	SOCDataInterface,
	SOContentInterface,
	SOCStateInterface
} from './Orders.slice.interface';

// initial state
export const initialState: SliceOrdersInterface = {
	loader: false,
	loading: false,
	updating: false,
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
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		updating: (state) => {
			state.updating = true;
		},
		updated: (state, action) => {
			state.updating = false;
			state.content = action.payload;
		},
		updateFailed: (state) => {
			state.updating = false;
		},
		reset: () => initialState
	}
});

// actions
export const { loader, loading, success, failure, updating, updated, updateFailed, reset } =
	dataSlice.actions;

// selector
export const ordersSelector = (state: AppReducerType) => state['orders'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot orders
 * @param robotId
 * @param payload
 * @param refresh
 * @returns
 */
export const OrdersFetchList =
	(robotId: string, payload: RobotOrdersListPayloadInterface, refresh = false) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const orders = states.orders;

		// return on busy
		if (orders && (orders.loader || orders.loading || orders.updating)) {
			return;
		}

		// dispatch: loader/loading
		dispatch(!refresh ? loader() : loading());

		return RobotsService.robotOrdersFetch(robotId, payload)
			.then(async (res) => {
				// deserialize response
				let result: SOContentInterface = await deserializeOrders(res);

				// state
				result = {
					...result,
					state: {
						...payload,
						pRobotId: robotId
					}
				};

				// handle refresh and pagination
				if (orders && orders.content) {
					result = handleRefreshAndPagination(
						orders.content,
						result,
						refresh,
						payload.rowsPerPage
					);
				}

				// dispatch: success
				dispatch(success(result));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'fetch-orders-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'PAGE_ERROR.DESCRIPTION'
				};

				// dispatch: failure
				dispatch(failure(message));
			});
	};

/**
 * create an order
 * @param siteId
 * @param payload
 * @param callback
 * @returns
 */
export const OrderCreate =
	(siteId: string, payload: DialogCreateOrderFormInterface, callback: () => void) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const orders = states.orders;

		// dispatch: updating
		dispatch(updating());

		return RobotsService.robotOrderCreate(siteId, payload)
			.then(async (res) => {
				// deserialize response
				let result = await deserializeOrder(res);

				if (orders.content) {
					// update created order
					result = updateCreatedOrder(orders.content, result);

					// dispatch: updated
					dispatch(updated(result));

					// dispatch: trigger message
					const message: TriggerMessageInterface = {
						id: 'create-order-success',
						show: true,
						severity: TriggerMessageTypeEnum.SUCCESS,
						text: 'ROBOTS.ORDERS.CREATE.SUCCESS'
					};
					dispatch(triggerMessage(message));

					// callback
					callback();
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'create-order-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.ORDERS.CREATE.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * cancel an order
 * @param order
 * @param callback
 * @returns
 */
export const OrderCancel =
	(order: SOCDataInterface, callback: () => void) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const orders = states.orders;

		// dispatch: updating
		dispatch(updating());

		return RobotsService.robotOrderCancel(order.site.id, [order.id])
			.then(async (res) => {
				// deserialize response
				let result = await deserializeOrders(res);

				if (orders.content) {
					// update canceled order
					result = updateCanceledOrder(orders.content, result.data[0]);

					// dispatch: updated
					dispatch(updated(result));

					// dispatch: trigger message
					const message: TriggerMessageInterface = {
						id: 'cancel-order-success',
						show: true,
						severity: TriggerMessageTypeEnum.SUCCESS,
						text: 'ROBOTS.ORDERS.CANCEL.SUCCESS'
					};
					dispatch(triggerMessage(message));

					// callback
					callback();
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'cancel-order-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'ROBOTS.ORDERS.CANCEL.ERROR'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * update state
 * @param state
 * @returns
 */
export const OrderUpdateState =
	(state: SOCStateInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const orders = states.orders;

		// dispatch: updating
		dispatch(updating());

		if (orders && orders.content) {
			const result = {
				...orders.content,
				state
			};

			// dispatch: updated
			dispatch(updated(result));
		}
	};

/**
 * handle refresh and pagination
 * @param current
 * @param result
 * @param refresh
 * @param rowsPerPage
 * @returns
 */
const handleRefreshAndPagination = (
	current: SOContentInterface,
	result: SOContentInterface,
	refresh: boolean,
	rowsPerPage: number
) => {
	if (refresh) {
		const dataItems = current.data.slice(rowsPerPage);
		return {
			...current,
			data: [...result.data, ...dataItems],
			meta: {
				...current.meta,
				totalDocs: result.meta.totalDocs,
				totalPages: result.meta.totalPages
			}
		};
	} else if (result.meta.page > 1) {
		return {
			...current,
			meta: {
				...current.meta,
				...result.meta
			},
			data: [...current.data, ...result.data]
		};
	}
	return result;
};

/**
 * update created order
 * @param state
 * @param order
 * @returns
 */
const updateCreatedOrder = (
	state: SOContentInterface,
	order: SOCDataInterface
): SOContentInterface => ({
	...state,
	data: [order, ...state.data]
});

/**
 * update canceled order
 * @param state
 * @param order
 * @returns
 */
const updateCanceledOrder = (
	state: SOContentInterface,
	order: SOCDataInterface
): SOContentInterface => ({
	...state,
	data: state.data.map((item) => {
		if (item.id === order.id) {
			return order;
		}
		return item;
	})
});
