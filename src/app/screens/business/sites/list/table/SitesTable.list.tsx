import { SitesTableColumnsTypeEnum } from './SitesTable.enum';
import { SitesTableColumnInterface } from './SitesTable.interface';

export const columns: SitesTableColumnInterface[] = [
	{
		id: SitesTableColumnsTypeEnum.SITE_TITLE,
		label: 'LIST.TABLE.COLUMNS.NAME',
		minWidth: 250,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.TIMEZONE,
		label: 'LIST.TABLE.COLUMNS.TIMEZONE',
		minWidth: 220,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.CURRENCY,
		label: 'LIST.TABLE.COLUMNS.CURRENCY',
		minWidth: 160,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.ACCEPT_ORDER,
		label: 'LIST.TABLE.COLUMNS.ACCEPT_ORDERS',
		width: 130,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.UPDATED_AT,
		label: 'LIST.TABLE.COLUMNS.UPDATED_AT',
		minWidth: 180,
		align: 'right'
	}
];
