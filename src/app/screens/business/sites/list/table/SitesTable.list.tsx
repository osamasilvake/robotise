import { pxToRem } from '../../../../../utilities/methods/Number';
import { SitesTableColumnsTypeEnum } from './SitesTable.enum';
import { SitesTableColumnInterface } from './SitesTable.interface';

const translation = 'LIST.TABLE.COLUMNS';
export const columns: SitesTableColumnInterface[] = [
	{
		id: SitesTableColumnsTypeEnum.ID,
		label: `${translation}.ID`,
		width: 20,
		align: 'right',
		noSort: true,
		padding: `0 ${pxToRem(5)}`
	},
	{
		id: SitesTableColumnsTypeEnum.SITE_TITLE,
		label: `${translation}.NAME`,
		minWidth: 220,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.TIMEZONE,
		label: `${translation}.TIMEZONE`,
		minWidth: 220,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.CURRENCY,
		label: `${translation}.CURRENCY`,
		minWidth: 160,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.ACCEPT_ORDER,
		label: `${translation}.ACCEPT_ORDERS`,
		width: 130,
		align: 'left'
	},
	{
		id: SitesTableColumnsTypeEnum.UPDATED,
		label: `${translation}.UPDATED`,
		minWidth: 180,
		align: 'right'
	}
];
