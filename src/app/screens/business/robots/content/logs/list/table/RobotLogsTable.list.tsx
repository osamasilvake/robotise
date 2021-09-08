import { RobotLogsTableColumnsTypeEnum } from './RobotLogsTable.enum';
import { RobotLogsTableColumnInterface } from './RobotLogsTable.interface';

const translation = 'CONTENT.LOGS.LIST.TABLE.COLUMNS';
export const columns: RobotLogsTableColumnInterface[] = [
	{
		id: RobotLogsTableColumnsTypeEnum.COMMAND,
		label: `${translation}.COMMAND`,
		minWidth: 210,
		align: 'left'
	},
	{
		id: RobotLogsTableColumnsTypeEnum.STATUS,
		label: `${translation}.STATUS`,
		minWidth: 160,
		align: 'left'
	},
	{
		id: RobotLogsTableColumnsTypeEnum.HISTORY,
		label: `${translation}.HISTORY`,
		minWidth: 200,
		align: 'left',
		noSort: true
	},
	{
		id: RobotLogsTableColumnsTypeEnum.CREATED,
		label: `${translation}.CREATED`,
		minWidth: 200,
		align: 'right'
	}
];
