import { pxToRem } from '../../../../../../../utilities/methods/Number';
import { SiteProductsTableColumnsTypeEnum } from './SiteProductsTable.enum';
import { SiteProductsTableColumnInterface } from './SiteProductsTable.interface';

const translation = 'CONTENT.PRODUCTS.LIST.TABLE.COLUMNS';
export const columns: SiteProductsTableColumnInterface[] = [
	{
		id: SiteProductsTableColumnsTypeEnum.ID,
		label: `${translation}.ID`,
		width: 20,
		align: 'right',
		noSort: true,
		padding: `0 ${pxToRem(5)}`
	},
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
		id: SiteProductsTableColumnsTypeEnum.CATEGORY,
		label: `${translation}.CATEGORY`,
		minWidth: 90,
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
		minWidth: 90,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.WEIGHT,
		label: `${translation}.WEIGHT`,
		minWidth: 90,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.SIZE,
		label: `${translation}.SIZE`,
		minWidth: 90,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.UPDATED,
		label: `${translation}.UPDATED`,
		minWidth: 180,
		align: 'left'
	},
	{
		id: SiteProductsTableColumnsTypeEnum.ACTIONS,
		label: `${translation}.ACTIONS`,
		minWidth: 105,
		align: 'right',
		noSort: true
	}
];
