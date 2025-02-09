import {
	StatusTypeEnum,
	StatusTypeTextEnum
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
		command: `${translation}.COMMAND.${commandLog.command}`,
		history: commandLog.history.map((item) => ({
			...item,
			status: `${translation}.HISTORY.STATUS.${item.status}`
		}))
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
				color: StatusTypeTextEnum.SUCCESS_LIGHT,
				icon: 'cached_outlined'
			};
		case RobotCommandsLogTableColumnStatusTypeEnum.SUCCESS:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case RobotCommandsLogTableColumnStatusTypeEnum.REJECTED:
		case RobotCommandsLogTableColumnStatusTypeEnum.FAILED:
			return {
				color: StatusTypeTextEnum.ERROR,
				icon: 'cancel_outlined'
			};
		default:
			return {
				color: StatusTypeTextEnum.INFO,
				icon: 'info_outlined'
			};
	}
};
