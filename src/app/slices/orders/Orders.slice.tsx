import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { DialogCreateOrderPayloadInterface } from '../../screens/business/robots/content/orders/list/actions/RobotOrdersActions.interface';
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
	creating: false,
	canceling: false,
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
		updating: (state) => {
			state.updating = true;
		},
		creating: (state) => {
			state.creating = true;
		},
		canceling: (state) => {
			state.canceling = true;
		},
		success: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		updated: (state, action) => {
			state.updating = false;
			state.content = action.payload;
		},
		created: (state, action) => {
			state.creating = false;
			state.content = action.payload;
		},
		canceled: (state, action) => {
			state.canceling = false;
			state.content = action.payload;
		},
		failure: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.creating = false;
			state.canceling = false;
			state.content = null;
			state.errors = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const {
	loader,
	loading,
	updating,
	creating,
	canceling,
	success,
	updated,
	created,
	canceled,
	failure,
	reset
} = dataSlice.actions;

// selector
export const ordersSelector = (state: AppReducerType) => state['orders'];

// reducer
export default dataSlice.reducer;

/**
 * fetch orders
 * @param robotId
 * @param page
 * @param rowsPerPage
 * @param activeOrders
 * @param refresh
 * @returns
 */
export const OrdersFetchList = (
	robotId: string,
	page: number,
	rowsPerPage: number,
	activeOrders = false,
	refresh = false
) => async (dispatch: Dispatch, getState: () => AppReducerType) => {
	// states
	const states = getState();
	const orders = states.orders;

	// return on busy
	if (orders && (orders.loader || orders.loading || orders.creating || orders.canceling)) {
		return;
	}

	// dispatch: loader/loading
	dispatch(!refresh ? loader() : loading());

	return RobotsService.robotOrdersFetch(robotId, page, rowsPerPage, activeOrders)
		.then(async (res) => {
			// deserialize response
			let result: SOContentInterface = await deserializeOrders(res);

			// prepare content
			result = {
				...result,
				state: {
					robotId,
					page,
					rowsPerPage,
					activeOrders
				}
			};

			// handle pagination state
			result = orders && orders.content ? handlePagination(orders.content, result) : result;

			// dispatch: success
			dispatch(success(result));
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
 * create an order
 * @param payload
 * @param siteId
 * @returns
 */
export const OrderCreate = (payload: DialogCreateOrderPayloadInterface, siteId: string) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
	// states
	const states = getState();
	const orders = states.orders;

	// dispatch: creating
	dispatch(creating());

	return RobotsService.robotOrderCreate(payload, siteId)
		.then(async (res) => {
			// deserialize response
			let result = await deserializeOrder(res);

			if (orders.content) {
				// update created order
				result = updateCreatedOrder(orders.content, result);

				// dispatch: created
				dispatch(created(result));

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'create-order-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.ORDERS.ORDER_CREATE.SUCCESS'
				};
				dispatch(triggerMessage(message));
			}
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'create-order-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.CANCEL'
			};

			// dispatch: failure
			dispatch(failure(message));
		});
};

/**
 * cancel an order
 * @param order
 * @returns
 */
export const OrderCancel = (order: SOCDataInterface) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
	// states
	const states = getState();
	const orders = states.orders;

	// dispatch: canceling
	dispatch(canceling());

	return RobotsService.robotOrderCancel([order.id], order.site.id)
		.then(async (res) => {
			// deserialize response
			let result = await deserializeOrders(res);

			if (orders.content) {
				// update created order
				result = updateCanceledOrder(orders.content, result.data[0]);

				// dispatch: canceled
				dispatch(canceled(result));

				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'cancel-order-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: 'ROBOTS.ORDERS.ORDER_CANCEL.SUCCESS'
				};
				dispatch(triggerMessage(message));
			}
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				id: 'cancel-order-error',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.CANCEL'
			};

			// dispatch: failure
			dispatch(failure(message));
		});
};

/**
 * update state
 * @param state
 * @returns
 */
export const OrderUpdateState = (state: SOCState) => async (
	dispatch: Dispatch,
	getState: () => AppReducerType
) => {
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
 * handle pagination
 * @param state
 * @param action
 * @returns
 */
const handlePagination = (state: SOContentInterface, action: SOContentInterface) => {
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

/**
 * update created order
 *
 * cases:
 * add item on the front
 * remove item from the end
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
		data: [order, ...state.data.slice(0, -1)],
		dataById: {
			[order.id]: order,
			...state.dataById
		}
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
		}),
		dataById: {
			...state.dataById,
			[order.id]: order
		}
	};
};
