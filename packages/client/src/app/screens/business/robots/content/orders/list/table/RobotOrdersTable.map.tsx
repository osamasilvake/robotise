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
		case RobotOrdersTableColumnStatusTypeEnum.TRAVELLING:
		case RobotOrdersTableColumnStatusTypeEnum.ARRIVED:
		case RobotOrdersTableColumnStatusTypeEnum.FINISHED:
			return StatusTypeEnum.SUCCESS;
		case RobotOrdersTableColumnStatusTypeEnum.PENDING:
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED:
		case RobotOrdersTableColumnStatusTypeEnum.CANCELED_REQUEST:
			return StatusTypeEnum.WARN;
		case RobotOrdersTableColumnStatusTypeEnum.REJECTED:
		case RobotOrdersTableColumnStatusTypeEnum.ERROR:
			return StatusTypeEnum.ERROR;
		default:
			return StatusTypeEnum.NOTICE;
	}
};
