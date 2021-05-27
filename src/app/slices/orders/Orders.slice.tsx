import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { DialogCreateOrderPayloadInterface } from '../../screens/business/robots/content/orders/list/actions/RobotOrdersActions.interface';
import { RobotOrdersFetchListInterface } from '../../screens/business/robots/content/orders/RobotOrders.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeOrder } from '../../utilities/serializers/json-api/Order.deserialize';
import { deserializeOrders } from '../../utilities/serializers/json-api/Orders.deserialize';
import { AppReducerType } from '..';
import { triggerMessage } from '../general/General.slice';
import {
	SliceOrdersInterface,
	SOCDataInterface,
	SOContentInterface,
	SOCState
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
 * fetch orders
 * @param payload
 * @param refresh
 * @returns
 */
export const OrdersFetchList =
	(payload: RobotOrdersFetchListInterface, refresh = false) =>
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

		return RobotsService.robotOrdersFetch(payload)
			.then(async (res) => {
				// deserialize response
				let result: SOContentInterface = await deserializeOrders(res);

				// state
				result = {
					...result,
					state: payload
				};

				// handle mapping
				result = handleMapping(result);

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
 * @param payload
 * @param siteId
 * @returns
 */
export const OrderCreate =
	(payload: DialogCreateOrderPayloadInterface, siteId: string) =>
	async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const orders = states.orders;

		// dispatch: updating
		dispatch(updating());

		return RobotsService.robotOrderCreate(payload, siteId)
			.then(async (res) => {
				// deserialize response
				let result = await deserializeOrder(res);

				if (orders.content) {
					// update created order
					result = updateCreatedOrder(orders.content, mapItem(result));

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
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'create-order-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'API.ORDER.CREATE'
				};
				dispatch(triggerMessage(message));

				// dispatch: update failed
				dispatch(updateFailed());
			});
	};

/**
 * cancel an order
 * @param order
 * @returns
 */
export const OrderCancel =
	(order: SOCDataInterface) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
		// states
		const states = getState();
		const orders = states.orders;

		// dispatch: updating
		dispatch(updating());

		return RobotsService.robotOrderCancel([order.id], order.site.id)
			.then(async (res) => {
				// deserialize response
				let result = await deserializeOrders(res);

				if (orders.content) {
					// update created order
					result = updateCanceledOrder(orders.content, mapItem(result.data[0]));

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
				}
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'cancel-order-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: 'API.ORDER.CANCEL'
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
	(state: SOCState) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
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
 * handle mapping
 * @param result
 * @returns
 */
const handleMapping = (result: SOContentInterface) => ({
	...result,
	data: result.data.map((item) => mapItem(item))
});

/**
 * map item
 * @param item
 * @returns
 */
const mapItem = (item: SOCDataInterface) => ({
	...item,
	status: `CONTENT.ORDERS.LIST.TABLE.VALUES.STATUS.${item.status}`,
	location: item.location || 'CONTENT.ORDERS.LIST.TABLE.VALUES.TARGET.RECEPTION',
	mode: `CONTENT.ORDERS.COMMON.MODE.${item.mode}`,
	origin: `CONTENT.ORDERS.LIST.TABLE.VALUES.ORIGIN.${item.origin}`
});

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
): SOContentInterface => {
	return {
		...state,
		data: [order, ...state.data]
	};
};

/**
 * update canceled order
 * @param state
 * @param order
 * @returns
 */
const updateCanceledOrder = (
	state: SOContentInterface,
	order: SOCDataInterface
): SOContentInterface => {
	return {
		...state,
		data: state.data.map((d) => {
			if (d.id === order.id) {
				return order;
			}
			return d;
		})
	};
};
