import { AllOrderHistoryTypeEnum } from './AllOrder.slice.enum';
import { SAODataInterface } from './AllOrders.slice.interface';

/**
 * map order
 * @param result
 * @returns
 */
export const mapOrder = (result: SAODataInterface) =>
	result.history
		? {
				...result,
				history: result.history.filter(
					(item) => item.event === AllOrderHistoryTypeEnum.GOT_STATUS
				)
		  }
		: result;
