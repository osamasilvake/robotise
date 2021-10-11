import { RobotCommandsLogTableColumnsTypeEnum } from './RobotCommandsLogTable.enum';
import { RobotCommandsLogTableColumnInterface } from './RobotCommandsLogTable.interface';

const translation = 'CONTENT.COMMANDS_LOGS.LIST.TABLE.COLUMNS';
export const columns: RobotCommandsLogTableColumnInterface[] = [
	{
		id: RobotCommandsLogTableColumnsTypeEnum.COMMAND,
		label: `${translation}.COMMAND`,
		minWidth: 210,
		align: 'left'
	},
	{
		id: RobotCommandsLogTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 160,
		align: 'left'
	},
	{
		id: RobotCommandsLogTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 200,
		align: 'left',
		noSort: true
	},
	{
		id: RobotCommandsLogTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'right'
	}
];
