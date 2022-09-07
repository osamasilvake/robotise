import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { SOCDataInterface } from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { RobotOrdersTableColumnStatusTypeEnum } from './RobotOrdersTable.enum';
import { cancellableOrders } from './RobotOrdersTable.list';

/**
 * map order
 * @param order
 * @returns
 */
export const mapOrder = (order: SOCDataInterface) => {
	const translation = 'CONTENT.ORDERS';
	return {
		...order,
		status: `${translation}.LIST.TABLE.VALUES.STATUS.${order.status}`,
		location:
			order.location?.length <= 4
				? order.location
				: `${translation}.LIST.TABLE.VALUES.TARGET.RECEPTION`,
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
		case RobotOrdersTableColumnStatusTypeEnum.PENDING:
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED_TIMEOUT_CUSTOMER_NOT_PRESENT:
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED_TIMEOUT_DURING_INTERACTION:
		case RobotOrdersTableColumnStatusTypeEnum.REJECTED:
		case RobotOrdersTableColumnStatusTypeEnum.REJECTED_ALREADY_IN_STACK:
		case RobotOrdersTableColumnStatusTypeEnum.REJECTED_UNKNOWN_LOCATION:
		case RobotOrdersTableColumnStatusTypeEnum.AWAITING_CANCELLATION:
			return StatusTypeEnum.WARN;
		case RobotOrdersTableColumnStatusTypeEnum.TRAVELING:
		case RobotOrdersTableColumnStatusTypeEnum.ARRIVED:
		case RobotOrdersTableColumnStatusTypeEnum.CUSTOMER_PRESENT:
		case RobotOrdersTableColumnStatusTypeEnum.FINISH_REQUESTED:
		case RobotOrdersTableColumnStatusTypeEnum.AWAITING_FINISH:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotOrdersTableColumnStatusTypeEnum.FINISHED:
			return StatusTypeEnum.SUCCESS_DARK;
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED:
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED_REQUEST:
		case RobotOrdersTableColumnStatusTypeEnum.ERROR:
			return StatusTypeEnum.ERROR;
		case RobotOrdersTableColumnStatusTypeEnum.CREATED:
		default:
			return StatusTypeEnum.INFO;
	}
};

/**
 * is cancellable order
 * @param status
 * @returns
 */
export const isOrderCancellable = (status: string) => {
	const value = status.split('.').pop();
	return cancellableOrders.includes(value || '');
};
