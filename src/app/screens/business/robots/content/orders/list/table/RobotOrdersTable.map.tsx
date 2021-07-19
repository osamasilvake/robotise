import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotOrdersTableColumnStatusTypeEnum } from './RobotOrdersTable.enum';
import { cancellableOrders } from './RobotOrdersTable.list';

/**
 * map status level
 * @param status
 * @returns
 */
export const mapStatusLevel = (status: string) => {
	const value = status.split('.').pop();
	switch (value) {
		case RobotOrdersTableColumnStatusTypeEnum.PENDING:
		case RobotOrdersTableColumnStatusTypeEnum.TIMEOUT:
			return StatusTypeEnum.WARN;
		case RobotOrdersTableColumnStatusTypeEnum.TRAVELLING:
		case RobotOrdersTableColumnStatusTypeEnum.ARRIVED:
		case RobotOrdersTableColumnStatusTypeEnum.CUSTOMER_PRESENT:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotOrdersTableColumnStatusTypeEnum.FINISHED:
			return StatusTypeEnum.SUCCESS_DARK;
		case RobotOrdersTableColumnStatusTypeEnum.REJECTED:
		case RobotOrdersTableColumnStatusTypeEnum.REJECTED_ALREADY_IN_STACK:
		case RobotOrdersTableColumnStatusTypeEnum.REJECTED_UNKNOWN_LOCATION:
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
