import { SiteProductsTableColumnsTypeEnum } from './SiteProductsTable.enum';
import { SiteProductsTableColumnInterface } from './SiteProductsTable.interface';

const translation = 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS';
export const columns: SiteProductsTableColumnInterface[] = [
	{
		id: SiteProductsTableColumnsTypeEnum.IMAGE,
		label: `${translation}.IMAGE`,
		minWidth: 80,
		align: 'left',
		noSort: true
	},
	{
		id: SiteProductsTableColumnsTypeEnum.NAME,
		label: `${translation}.NAME`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.PRICE,
		label: `${translation}.PRICE`,
		minWidth: 110,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.LENGTH,
		label: `${translation}.LENGTH`,
		minWidth: 145,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.WEIGHT,
		label: `${translation}.WEIGHT`,
		minWidth: 125,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.SIZE,
		label: `${translation}.SIZE`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.UPDATED_AT,
		label: `${translation}.UPDATED_AT`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.ACTIONS,
		label: `${translation}.ACTIONS`,
		minWidth: 145,
		align: 'right'
	}
];
