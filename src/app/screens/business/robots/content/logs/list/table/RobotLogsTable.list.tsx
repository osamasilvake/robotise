import { RobotLogsTableColumnsTypeEnum } from './RobotLogsTable.enum';
import { RobotLogsTableColumnInterface } from './RobotLogsTable.interface';

const common = 'CONTENT.LOGS.LIST.TABLE.COLUMNS';
export const columns: RobotLogsTableColumnInterface[] = [
	{
		id: RobotLogsTableColumnsTypeEnum.COMMAND,
		label: `${common}.COMMAND`,
		minWidth: 210,
		align: 'left'
	},
	{
		id: RobotLogsTableColumnsTypeEnum.STATUS,
		label: `${common}.STATUS`,
		minWidth: 160,
		align: 'left'
	},
	{
		id: RobotLogsTableColumnsTypeEnum.HISTORY,
		label: `${common}.HISTORY`,
		minWidth: 200,
		align: 'left',
		noSort: true
	},
	{
		id: RobotLogsTableColumnsTypeEnum.CREATED,
		label: `${common}.CREATED`,
		minWidth: 200,
		align: 'right'
	}
];
