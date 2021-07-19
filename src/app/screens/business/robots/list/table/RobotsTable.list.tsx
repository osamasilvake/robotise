import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableColumnInterface } from './RobotsTable.interface';

export const columns: RobotsTableColumnInterface[] = [
	{
		id: RobotsTableColumnsTypeEnum.ROBOT_TITLE,
		label: 'LIST.TABLE.COLUMNS.NAME',
		minWidth: 140,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ACTIVE,
		label: 'LIST.TABLE.COLUMNS.ACTIVE',
		width: 120,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.CONTROL_MODE,
		label: 'LIST.TABLE.COLUMNS.CONTROL_MODE',
		width: 130,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ACCEPT_ORDER,
		label: 'LIST.TABLE.COLUMNS.ACCEPT_ORDERS',
		width: 120,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.MISSION_STATUS,
		label: 'LIST.TABLE.COLUMNS.MISSION_STATUS',
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.UPDATED_AT,
		label: 'LIST.TABLE.COLUMNS.UPDATED_AT',
		minWidth: 180,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ALERTS,
		label: 'LIST.TABLE.COLUMNS.ALERTS',
		width: 100,
		align: 'right'
	}
];
