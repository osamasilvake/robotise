import { SOCDataInterface, SOContentInterface } from './Orders.slice.interface';

/**
 * update created order
 * @param state
 * @param order
 * @returns
 */
export const updateCreatedOrder = (
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
export const updateCanceledOrder = (
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
