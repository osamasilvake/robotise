import { SPContentTopProductsBucketInterface } from '../../../../../../../../slices/business/sites/performance/Performance.slice.interface';
import { SitePerformanceDemographyTopProductsTableColumnsTypeEnum } from './SitePerformanceDemographyTopProductsTable.enum';

export interface SitePerformanceDemographyTopProductsTableInterface {
	topProducts: SPContentTopProductsBucketInterface[];
	currency?: string;
}

export interface SitePerformanceDemographyTopProductsTableColumnInterface {
	id: SitePerformanceDemographyTopProductsTableColumnsTypeEnum;
	label: string;
	minWidth?: number;
	width?: number;
	align?: SitePerformanceDemographyTopProductsTableHeadAlignment;
}

export type SitePerformanceDemographyTopProductsTableHeadAlignment =
	| 'inherit'
	| 'left'
	| 'center'
	| 'right'
	| 'justify';
