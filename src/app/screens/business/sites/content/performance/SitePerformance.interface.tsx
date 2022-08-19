import { SitePerformancePeriodListInterface } from './period/SitePerformancePeriod.interface';

export interface SitePerformancePayloadInterface {
	lookup: { period: number; unit: string };
	robot?: string;
	site?: string;
	excludeTotalPriceZero?: boolean;
	topItems?: number;
	currentPeriod?: SitePerformancePeriodListInterface;
}

export interface SitePerformanceDownloadInterface {
	siteName: string;
	currentPeriod: string;
}
