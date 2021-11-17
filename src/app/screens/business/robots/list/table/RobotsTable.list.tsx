import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableColumnInterface } from './RobotsTable.interface';

const translation = 'LIST.TABLE.COLUMNS';
export const columns: RobotsTableColumnInterface[] = [
	{
		id: RobotsTableColumnsTypeEnum.ROBOT_TITLE,
		label: `${translation}.NAME`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ACTIVE,
		label: `${translation}.ACTIVE`,
		width: 120,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.CONTROL_MODE,
		label: `${translation}.CONTROL_MODE`,
		width: 130,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ACCEPT_ORDER,
		label: `${translation}.ACCEPT_ORDERS`,
		width: 120,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.BATTERY_PERCENTAGE,
		label: `${translation}.BATTERY_PERCENTAGE`,
		minWidth: 130,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.MISSION_STATUS,
		label: `${translation}.MISSION_STATUS`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.UPDATED,
		label: `${translation}.UPDATED`,
		minWidth: 180,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ALERTS,
		label: `${translation}.ALERTS`,
		width: 100,
		align: 'right'
	}
];
