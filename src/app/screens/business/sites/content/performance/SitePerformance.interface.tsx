import {
	SPContentInventoryInterface,
	SPContentOrdersInterface,
	SPContentPurchasesInterface,
	SPContentTopProductsInterface
} from '../../../../../slices/business/sites/performance/Performance.slice.interface';

export interface SitePerformancePayloadInterface {
	lookup: { period: number; unit: string };
	robot?: string;
	site?: string;
	excludeTotalPriceZero?: boolean;
	topItems?: number;
}

export interface SitePerformancePurchasesAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentPurchasesInterface;
	};
}

export interface SitePerformanceOrdersAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentOrdersInterface;
	};
}

export interface SitePerformanceInventoryAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentInventoryInterface;
	};
}

export interface SitePerformanceTopProductsAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentTopProductsInterface;
	};
}
