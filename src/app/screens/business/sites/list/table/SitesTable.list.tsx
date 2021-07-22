import { SitesTableColumnsTypeEnum } from './SitesTable.enum';
import { SitesTableColumnInterface } from './SitesTable.interface';

const common = 'LIST.TABLE.COLUMNS';
export const columns: SitesTableColumnInterface[] = [
	{
		id: SitesTableColumnsTypeEnum.SITE_TITLE,
		label: `${common}.NAME`,
		minWidth: 250,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.TIMEZONE,
		label: `${common}.TIMEZONE`,
		minWidth: 220,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.CURRENCY,
		label: `${common}.CURRENCY`,
		minWidth: 160,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.ACCEPT_ORDER,
		label: `${common}.ACCEPT_ORDERS`,
		width: 130,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.UPDATED_AT,
		label: `${common}.UPDATED_AT`,
		minWidth: 180,
		align: 'right'
	}
];
