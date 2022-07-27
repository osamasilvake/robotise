import { SPContentTopProductsBucketInterface } from '../../../../../../../slices/business/sites/performance/Performance.slice.interface';

export interface SitePerformanceDemographyTopProductsInterface {
	topProducts: SPContentTopProductsBucketInterface[];
	currency?: string;
}
