import { RobotLogsTableColumnsTypeEnum } from './RobotLogsTable.enum';
import { RobotLogsTableColumnInterface } from './RobotLogsTable.interface';

const common = 'CONTENT.LOGS.LIST.TABLE.COLUMNS';
export const columns: RobotLogsTableColumnInterface[] = [
	{
		id: RobotLogsTableColumnsTypeEnum.COMMAND,
		label: `${common}.COMMAND`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotLogsTableColumnsTypeEnum.STATUS,
		label: `${common}.STATUS`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotLogsTableColumnsTypeEnum.CREATED,
		label: `${common}.CREATED`,
		minWidth: 200,
		align: 'right'
	}
];
