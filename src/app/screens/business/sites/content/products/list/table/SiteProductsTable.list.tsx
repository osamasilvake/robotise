import { SiteProductsTableColumnsTypeEnum } from './SiteProductsTable.enum';
import { SiteProductsTableColumnInterface } from './SiteProductsTable.interface';

// columns
export const columns: SiteProductsTableColumnInterface[] = [
	{
		id: SiteProductsTableColumnsTypeEnum.IMAGE,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.IMAGE',
		minWidth: 120,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.NAME,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.NAME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.PRICE,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.PRICE',
		minWidth: 170,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.LENGTH,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.LENGTH',
		minWidth: 170,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.VOLUME,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.VOLUME',
		minWidth: 170,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.UPDATED,
		label: 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS.UPDATED',
		minWidth: 200,
		align: 'right'
	}
];
