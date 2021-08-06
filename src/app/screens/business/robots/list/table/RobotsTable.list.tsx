import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableColumnInterface } from './RobotsTable.interface';

const common = 'LIST.TABLE.COLUMNS';
export const columns: RobotsTableColumnInterface[] = [
	{
		id: RobotsTableColumnsTypeEnum.ROBOT_TITLE,
		label: `${common}.NAME`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ACTIVE,
		label: `${common}.ACTIVE`,
		width: 120,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.CONTROL_MODE,
		label: `${common}.CONTROL_MODE`,
		width: 130,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ACCEPT_ORDER,
		label: `${common}.ACCEPT_ORDERS`,
		width: 120,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.BATTERY_PERCENTAGE,
		label: `${common}.BATTERY_PERCENTAGE`,
		width: 150,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.MISSION_STATUS,
		label: `${common}.MISSION_STATUS`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.UPDATED_AT,
		label: `${common}.UPDATED_AT`,
		minWidth: 180,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ALERTS,
		label: `${common}.ALERTS`,
		width: 100,
		align: 'right'
	}
];
