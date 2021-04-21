import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotOrdersTableColumnStatusTypeEnum } from './RobotOrdersTable.enum';
import { CANCELLABLE_ORDERS } from './RobotOrdersTable.list';

/**
 * map status level
 * @param status
 * @returns
 */
export const mapStatusLevel = (status: string) => {
	switch (status) {
		case RobotOrdersTableColumnStatusTypeEnum.CREATED:
			return StatusTypeEnum.INIT;
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
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED:
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED_REQUEST:
		case RobotOrdersTableColumnStatusTypeEnum.ERROR:
		default:
			return StatusTypeEnum.ERROR;
	}
};

/**
 * is cancellable order
 * @param orders
 * @returns
 */
export const isOrderCancellable = (status: string) => CANCELLABLE_ORDERS.includes(status);
