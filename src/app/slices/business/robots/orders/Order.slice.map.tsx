import { OrderHistoryTypeEnum } from './Order.slice.enum';
import { SOCDataInterface } from './Orders.slice.interface';

/**
 * map order
 * @param result
 * @returns
 */
export const mapOrder = (result: SOCDataInterface) =>
	result.history
		? {
				...result,
				history: result.history.filter(
					(item) => item.event === OrderHistoryTypeEnum.GOT_STATUS
				)
		  }
		: result;
