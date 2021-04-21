import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { DialogCreateOrderPayloadInterface } from '../../screens/business/robots/content/orders/list/actions/RobotOrdersActions.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeOrders } from '../../utilities/serializers/json-api/Orders.deserialize';
import { AppReducerType } from '..';
import {
	SliceOrdersInterface,
	SOCDataInterface,
	SOContentInterface
} from './Orders.slice.interface';

// initial state
export const initialState: SliceOrdersInterface = {
	loader: false,
	loading: false,
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
		creating: (state) => {
			state.creating = true;
		},
		canceling: (state) => {
			state.canceling = true;
		},
		success: (state, action) => {
			state.loader = false;
			state.loading = false;
			state.content = state.content
				? handlePaginationState(state.content, action.payload)
				: action.payload;
			state.errors = null;
		},
		created: (state, action) => {
			state.creating = false;
			state.content =
				state.content && updateCreatedOrder(state.content, action.payload.data[0]);
		},
		canceled: (state, action) => {
			state.canceling = false;
			state.content =
				state.content && updateCanceledOrder(state.content, action.payload.data[0]);
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
	creating,
	canceling,
	success,
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
 * @param pageNo
 * @param rowsPerPage
 * @param activeOrders
 * @param refresh
 * @returns
 */
export const OrdersFetchList = (
	robotId: string,
	pageNo: number,
	rowsPerPage: number,
	activeOrders = false,
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

	return RobotsService.robotOrdersFetch(robotId, pageNo, rowsPerPage, activeOrders)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeOrders(res);

			// dispatch: success
			dispatch(
				success({
					...result,
					meta: {
						...result.meta,
						rowsPerPage: rowsPerPage
					},
					robot: {
						id: robotId
					}
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
 * create an order
 * @param payload
 * @param siteId
 * @returns
 */
export const OrderCreate = (payload: DialogCreateOrderPayloadInterface, siteId: string) => async (
	dispatch: Dispatch
) => {
	// dispatch: creating
	dispatch(creating());

	return RobotsService.robotOrderCreate(payload, siteId)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeOrders(res);

			// dispatch: created
			dispatch(created(result));
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
export const OrderCancel = (order: SOCDataInterface) => async (dispatch: Dispatch) => {
	// dispatch: canceling
	dispatch(canceling());

	return RobotsService.robotOrderCancel([order.id], order.site.id)
		.then(async (res) => {
			// deserialize response
			const result = await deserializeOrders(res);

			// dispatch: canceled
			dispatch(canceled(result));
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
		data: [order, ...state.data],
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

/**
 * organize robots state to handle pagination
 * @param state
 * @param action
 * @returns
 */
const handlePaginationState = (state: SOContentInterface, action: SOContentInterface) => {
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
