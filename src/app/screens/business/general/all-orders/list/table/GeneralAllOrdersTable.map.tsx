import { StatusTypeEnum } from '../../../../../../components/common/status/Status.enum';
import { SAODataInterface } from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { GeneralAllOrdersTableColumnStatusTypeEnum } from './GeneralAllOrdersTable.enum';

/**
 * map order
 * @param order
 * @returns
 */
export const mapOrder = (order: SAODataInterface) => {
	const translation = 'COMMON.ORDERS';
	return {
		...order,
		status: `${translation}.LIST.TABLE.VALUES.STATUS.${order.status}`,
		location: order.location,
		origin: `${translation}.LIST.TABLE.VALUES.ORIGIN.${order.origin}`
	};
};

/**
 * map status
 * @param status
 * @returns
 */
export const mapStatus = (status: string) => {
	const value = status && status.split('.').pop();
	switch (value) {
		case GeneralAllOrdersTableColumnStatusTypeEnum.PENDING:
		case GeneralAllOrdersTableColumnStatusTypeEnum.CANCELED_TIMEOUT_CUSTOMER_NOT_PRESENT:
		case GeneralAllOrdersTableColumnStatusTypeEnum.CANCELED_TIMEOUT_DURING_INTERACTION:
		case GeneralAllOrdersTableColumnStatusTypeEnum.INTERACTION_TIMEOUT_CUSTOMER_NOT_PRESENT:
		case GeneralAllOrdersTableColumnStatusTypeEnum.INTERACTION_TIMEOUT_INCOMPLETE_INTERACTION:
		case GeneralAllOrdersTableColumnStatusTypeEnum.REJECTED:
		case GeneralAllOrdersTableColumnStatusTypeEnum.REJECTED_ALREADY_IN_STACK:
		case GeneralAllOrdersTableColumnStatusTypeEnum.REJECTED_UNKNOWN_LOCATION:
		case GeneralAllOrdersTableColumnStatusTypeEnum.AWAITING_CANCELLATION:
			return StatusTypeEnum.WARN;
		case GeneralAllOrdersTableColumnStatusTypeEnum.TRAVELING:
		case GeneralAllOrdersTableColumnStatusTypeEnum.ARRIVED:
		case GeneralAllOrdersTableColumnStatusTypeEnum.CUSTOMER_PRESENT:
		case GeneralAllOrdersTableColumnStatusTypeEnum.FINISH_REQUESTED:
		case GeneralAllOrdersTableColumnStatusTypeEnum.AWAITING_FINISH:
		case GeneralAllOrdersTableColumnStatusTypeEnum.PHONE_ANSWERED:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case GeneralAllOrdersTableColumnStatusTypeEnum.FINISHED:
			return StatusTypeEnum.SUCCESS_DARK;
		case GeneralAllOrdersTableColumnStatusTypeEnum.CANCELED:
		case GeneralAllOrdersTableColumnStatusTypeEnum.CANCELED_REQUEST:
		case GeneralAllOrdersTableColumnStatusTypeEnum.ERROR:
			return StatusTypeEnum.ERROR;
		case GeneralAllOrdersTableColumnStatusTypeEnum.CREATED:
		default:
			return StatusTypeEnum.INFO;
	}
};
