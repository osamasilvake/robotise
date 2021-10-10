import {
	HistoryStatusTypeEnum,
	StatusTypeEnum
} from '../../../../../../../components/common/status/Status.enum';
import { CLCDataInterface } from '../../../../../../../slices/business/robots/commands-log/CommandsLog.slice.interface';
import { RobotCommandsLogTableColumnStatusTypeEnum } from './RobotCommandsLogTable.enum';

/**
 * map command log
 * @param commandLog
 * @returns
 */
export const mapCommandLog = (commandLog: CLCDataInterface) => {
	const translation = 'CONTENT.COMMANDS_LOGS.LIST.TABLE.VALUES';
	return {
		...commandLog,
		command: `${translation}.COMMAND.${commandLog.command}`
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
 * map history status
 * @param status
 * @returns
 */
export const mapHistoryStatus = (status: string) => {
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
