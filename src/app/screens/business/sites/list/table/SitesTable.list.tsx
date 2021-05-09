import { SitesTableColumnsTypeEnum } from './SitesTable.enum';
import { SitesTableColumnInterface } from './SitesTable.interface';

export const columns: SitesTableColumnInterface[] = [
	{
		id: SitesTableColumnsTypeEnum.SITE_TITLE,
		label: 'LIST.TABLE.COLUMNS.NAME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.TIMEZONE,
		label: 'LIST.TABLE.COLUMNS.TIMEZONE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.CURRENCY,
		label: 'LIST.TABLE.COLUMNS.CURRENCY',
		minWidth: 120,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.ACCEPT_ORDER,
		label: 'LIST.TABLE.COLUMNS.ACCEPT_ORDERS',
		minWidth: 120,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.UPDATED_AT,
		label: 'LIST.TABLE.COLUMNS.UPDATED_AT',
		minWidth: 120,
		align: 'right'
	}
];
