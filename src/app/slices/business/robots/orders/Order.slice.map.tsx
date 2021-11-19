import { OrderHistoryTypeEnum } from './Order.slice.enum';
import { SOCDataInterface } from './Orders.slice.interface';

/**
 * prepare order content
 * @param result
 * @returns
 */
export const prepareContent = (result: SOCDataInterface) => {
	if (result.history) {
		return {
			...result,
			history: result.history.filter((item) => item.event === OrderHistoryTypeEnum.GOT_STATUS)
		};
	}
	return result;
};
