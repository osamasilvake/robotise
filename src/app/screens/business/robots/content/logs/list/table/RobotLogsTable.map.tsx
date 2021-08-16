import {
	HistoryStatusTypeEnum,
	StatusTypeEnum
} from '../../../../../../../components/common/status/Status.enum';
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

/**
 * map history status level
 * @param status
 * @returns
 */
export const mapHistoryStatusLevel = (status: string) => {
	switch (status) {
		case RobotLogsTableColumnStatusTypeEnum.PROGRESS:
			return {
				color: HistoryStatusTypeEnum.SUCCESS_LIGHT,
				icon: 'cached_outlined'
			};
		case RobotLogsTableColumnStatusTypeEnum.SUCCESS:
			return {
				color: HistoryStatusTypeEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case RobotLogsTableColumnStatusTypeEnum.REJECTED:
		case RobotLogsTableColumnStatusTypeEnum.FAILED:
			return {
				color: HistoryStatusTypeEnum.ERROR,
				icon: 'cancel_outlined'
			};
		default:
			return {
				color: HistoryStatusTypeEnum.INFO,
				icon: 'info_outlined'
			};
	}
};
