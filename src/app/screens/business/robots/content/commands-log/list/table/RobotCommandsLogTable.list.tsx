import { pxToRem } from '../../../../../../../utilities/methods/Number';
import { RobotCommandsLogTableColumnsTypeEnum } from './RobotCommandsLogTable.enum';
import { RobotCommandsLogTableColumnInterface } from './RobotCommandsLogTable.interface';

const translation = 'CONTENT.COMMANDS_LOGS.LIST.TABLE.COLUMNS';
export const columns: RobotCommandsLogTableColumnInterface[] = [
	{
		id: RobotCommandsLogTableColumnsTypeEnum.ID,
		label: `${translation}.ID`,
		width: 20,
		align: 'right',
		noSort: true,
		padding: `0 ${pxToRem(5)}`
	},
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
		minWidth: 250,
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
