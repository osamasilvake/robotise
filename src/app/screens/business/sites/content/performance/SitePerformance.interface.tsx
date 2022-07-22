import { Dispatch, SetStateAction } from 'react';

import {
	SPContentInventoryInterface,
	SPContentPurchasesInterface
} from '../../../../../slices/business/sites/performance/Performance.slice.interface';
import { SitePerformancePeriodTypeEnum } from './period/SitePerformancePeriod.enum';

export interface SitePerformancePeriodListInterface {
	id: SitePerformancePeriodTypeEnum;
	label: string;
	period: number;
}

export interface SitePerformanceChartsInterface {
	sitePerformancePeriod: SitePerformancePeriodListInterface[];
	currentPeriod: SitePerformancePeriodTypeEnum;
	setCurrentPeriod: Dispatch<SetStateAction<SitePerformancePeriodListInterface>>;
}

export interface SitePerformancePayloadInterface {
	lookup: { period: number; unit: string };
	robot?: string;
	site?: string;
	excludeTotalPriceZero?: boolean;
}

export interface SitePerformancePurchasesAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentPurchasesInterface;
	};
}

export interface SitePerformanceInventoryAxiosGetInterface {
	data: {
		type: string;
		attributes: SPContentInventoryInterface;
	};
}
