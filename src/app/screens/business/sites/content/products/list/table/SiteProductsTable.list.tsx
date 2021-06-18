import { SiteProductsTableColumnsTypeEnum } from './SiteProductsTable.enum';
import { SiteProductsTableColumnInterface } from './SiteProductsTable.interface';

export const columns: SiteProductsTableColumnInterface[] = [
	{
		id: SiteProductsTableColumnsTypeEnum.IMAGE,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.IMAGE',
		minWidth: 80,
		align: 'left',
		noSort: true
	},
	{
		id: SiteProductsTableColumnsTypeEnum.NAME,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.NAME',
		minWidth: 200,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.PRICE,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.PRICE',
		minWidth: 110,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.LENGTH,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.LENGTH',
		minWidth: 145,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.WEIGHT,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.WEIGHT',
		minWidth: 125,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.SIZE,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.SIZE',
		minWidth: 100,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.UPDATED_AT,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.UPDATED_AT',
		minWidth: 200,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.ACTIONS,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.ACTIONS',
		minWidth: 145,
		align: 'right'
	}
];
