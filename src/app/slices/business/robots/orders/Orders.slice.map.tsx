import { SOCDataInterface, SOContentInterface } from './Orders.slice.interface';

/**
 * map created order
 * @param state
 * @param order
 * @returns
 */
export const mapCreatedOrder = (
	state: SOContentInterface,
	order: SOCDataInterface
): SOContentInterface => ({
	...state,
	data: [order, ...state.data]
});

/**
 * map canceled order
 * @param state
 * @param order
 * @returns
 */
export const mapCanceledOrder = (
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
