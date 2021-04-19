import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotOrdersTableColumnStatusTypeEnum } from './RobotOrdersTable.enum';

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
			return StatusTypeEnum.WARN;
		case RobotOrdersTableColumnStatusTypeEnum.TRAVELLING:
		case RobotOrdersTableColumnStatusTypeEnum.ARRIVED:
		case RobotOrdersTableColumnStatusTypeEnum.CUSTOMER_PRESENT:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotOrdersTableColumnStatusTypeEnum.FINISHED:
			return StatusTypeEnum.SUCCESS_DARK;
		case RobotOrdersTableColumnStatusTypeEnum.REJECTED:
		case RobotOrdersTableColumnStatusTypeEnum.ERROR:
			return StatusTypeEnum.ERROR;
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED:
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED_REQUEST:
		default:
			return StatusTypeEnum.NOTICE;
	}
};
