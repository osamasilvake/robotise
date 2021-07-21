import { SiteProductsTableColumnsTypeEnum } from './SiteProductsTable.enum';
import { SiteProductsTableColumnInterface } from './SiteProductsTable.interface';

const common = 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS';
export const columns: SiteProductsTableColumnInterface[] = [
	{
		id: SiteProductsTableColumnsTypeEnum.IMAGE,
		label: `${common}.IMAGE`,
		minWidth: 80,
		align: 'left',
		noSort: true
	},
	{
		id: SiteProductsTableColumnsTypeEnum.NAME,
		label: `${common}.NAME`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.PRICE,
		label: `${common}.PRICE`,
		minWidth: 110,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.LENGTH,
		label: `${common}.LENGTH`,
		minWidth: 145,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.WEIGHT,
		label: `${common}.WEIGHT`,
		minWidth: 125,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.SIZE,
		label: `${common}.SIZE`,
		minWidth: 100,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.UPDATED_AT,
		label: `${common}.UPDATED_AT`,
		minWidth: 200,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.ACTIONS,
		label: `${common}.ACTIONS`,
		minWidth: 145,
		align: 'right'
	}
];
