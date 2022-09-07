import { AllOrderHistoryTypeEnum } from './AllOrder.slice.enum';
import { SOCDataInterface } from './AllOrders.slice.interface';

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
					(item) => item.event === AllOrderHistoryTypeEnum.GOT_STATUS
				)
		  }
		: result;
