import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableColumnInterface } from './RobotsTable.interface';

export const columns: RobotsTableColumnInterface[] = [
	{
		id: RobotsTableColumnsTypeEnum.ROBOT_TITLE,
		label: 'LIST.TABLE.COLUMNS.NAME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.SITE_TITLE,
		label: 'LIST.TABLE.COLUMNS.SITE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.STATUS,
		label: 'LIST.TABLE.COLUMNS.STATUS',
		width: 150,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ACCEPT_ORDER,
		label: 'LIST.TABLE.COLUMNS.ACCEPT_ORDERS',
		width: 150,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.UPDATED_AT,
		label: 'LIST.TABLE.COLUMNS.UPDATED_AT',
		width: 180,
		align: 'left'
	},
	{
		id: RobotsTableColumnsTypeEnum.ALERTS,
		label: 'LIST.TABLE.COLUMNS.ALERTS',
		width: 150,
		align: 'right'
	}
];
