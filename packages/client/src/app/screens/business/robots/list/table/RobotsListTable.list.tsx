import { RobotsListTableColumnInterface } from './RobotsListTable.interface';

export const columns: RobotsListTableColumnInterface[] = [
	{
		id: 'robotTitle',
		label: 'LIST.TABLE.COLUMNS.NAME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'siteTitle',
		label: 'LIST.TABLE.COLUMNS.SITE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'isReady',
		label: 'LIST.TABLE.COLUMNS.STATUS',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'updatedAt',
		label: 'LIST.TABLE.COLUMNS.UPDATED_AT',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'alerts',
		label: 'LIST.TABLE.COLUMNS.ALERTS',
		minWidth: 170,
		align: 'right'
	}
];
