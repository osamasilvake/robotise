import {
	HistoryStatusTypeEnum,
	StatusTypeEnum
} from '../../../../../../../components/common/status/Status.enum';
import { RobotCommandsLogTableColumnStatusTypeEnum } from './RobotCommandsLogTable.enum';

/**
 * map status level
 * @param status
 * @returns
 */
export const mapStatusLevel = (status: string) => {
	const value = status && status.split('.').pop();
	switch (value) {
		case RobotCommandsLogTableColumnStatusTypeEnum.PROGRESS:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotCommandsLogTableColumnStatusTypeEnum.SUCCESS:
			return StatusTypeEnum.SUCCESS_DARK;
		case RobotCommandsLogTableColumnStatusTypeEnum.REJECTED:
		case RobotCommandsLogTableColumnStatusTypeEnum.FAILED:
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
		case RobotCommandsLogTableColumnStatusTypeEnum.PROGRESS:
			return {
				color: HistoryStatusTypeEnum.SUCCESS_LIGHT,
				icon: 'cached_outlined'
			};
		case RobotCommandsLogTableColumnStatusTypeEnum.SUCCESS:
			return {
				color: HistoryStatusTypeEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case RobotCommandsLogTableColumnStatusTypeEnum.REJECTED:
		case RobotCommandsLogTableColumnStatusTypeEnum.FAILED:
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
