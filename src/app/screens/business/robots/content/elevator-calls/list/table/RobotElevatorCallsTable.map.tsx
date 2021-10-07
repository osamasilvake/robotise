import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotElevatorCallsTableColumnStatusTypeEnum } from './RobotElevatorCallsTable.enum';

/**
 * map status level
 * @param status
 * @returns
 */
export const mapStatusLevel = (status: string) => {
	const value = status && status.split('.').pop();
	switch (value) {
		case RobotElevatorCallsTableColumnStatusTypeEnum.PROGRESS:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotElevatorCallsTableColumnStatusTypeEnum.CREATED:
		case RobotElevatorCallsTableColumnStatusTypeEnum.SUCCESS:
			return StatusTypeEnum.SUCCESS_DARK;
		case RobotElevatorCallsTableColumnStatusTypeEnum.FAILED:
			return StatusTypeEnum.ERROR;
		default:
			return StatusTypeEnum.INFO;
	}
};
