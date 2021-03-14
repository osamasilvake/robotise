import { RobotsListTableColumnInterface } from './RobotsList.interface';

export const columns: RobotsListTableColumnInterface[] = [
	{
		id: 'name',
		label: 'TABLE.COLUMNS.NAME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'siteTitle',
		label: 'TABLE.COLUMNS.SITE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'isReady',
		label: 'TABLE.COLUMNS.STATUS',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'updatedAt',
		label: 'TABLE.COLUMNS.UPDATED_AT',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'alerts',
		label: 'TABLE.COLUMNS.ALERTS',
		minWidth: 170,
		align: 'right'
	}
];
