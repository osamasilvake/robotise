import { SitePerformanceDemographyTopProductsTableColumnsTypeEnum } from './SitePerformanceDemographyTopProductsTable.enum';
import { SitePerformanceDemographyTopProductsTableColumnInterface } from './SitePerformanceDemographyTopProductsTable.interface';

const translation = 'CONTENT.PERFORMANCE.DEMOGRAPHY.TOP_PRODUCTS.TABLE.COLUMNS';
export const columns: SitePerformanceDemographyTopProductsTableColumnInterface[] = [
	{
		id: SitePerformanceDemographyTopProductsTableColumnsTypeEnum.IMAGE,
		label: `${translation}.IMAGE`,
		width: 50,
		align: 'left'
	},
	{
		id: SitePerformanceDemographyTopProductsTableColumnsTypeEnum.NAME,
		label: `${translation}.NAME`,
		minWidth: 170,
		align: 'left'
	},
	{
		id: SitePerformanceDemographyTopProductsTableColumnsTypeEnum.QUANTITY,
		label: `${translation}.QUANTITY`,
		width: 85,
		align: 'center'
	},
	{
		id: SitePerformanceDemographyTopProductsTableColumnsTypeEnum.REVENUE,
		label: `${translation}.REVENUE`,
		width: 85,
		align: 'right'
	}
];
