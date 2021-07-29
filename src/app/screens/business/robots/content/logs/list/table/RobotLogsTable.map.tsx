import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotLogsTableColumnStatusTypeEnum } from './RobotLogsTable.enum';

/**
 * map status level
 * @param status
 * @returns
 */
export const mapStatusLevel = (status: string) => {
	const value = status && status.split('.').pop();
	switch (value) {
		case RobotLogsTableColumnStatusTypeEnum.PROGRESS:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotLogsTableColumnStatusTypeEnum.SUCCESS:
			return StatusTypeEnum.SUCCESS_DARK;
		case RobotLogsTableColumnStatusTypeEnum.REJECTED:
		case RobotLogsTableColumnStatusTypeEnum.FAILED:
			return StatusTypeEnum.ERROR;
		default:
			return StatusTypeEnum.INFO;
	}
};
