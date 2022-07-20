import { Dispatch, SetStateAction } from 'react';

import { SPCDataInterface } from '../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { JsonAPIResponseInterface } from '../../../../../slices/JsonAPI.interface';
import { SitePerformancePeriodTypeEnum } from './period/SitePerformancePeriod.enum';

export interface SitePerformancePeriodListInterface {
	id: SitePerformancePeriodTypeEnum;
	label: string;
}

export interface SitePerformanceChartsInterface {
	sitePerformancePeriod: SitePerformancePeriodListInterface[];
	currentPeriod: SitePerformancePeriodTypeEnum;
	setCurrentPeriod: Dispatch<SetStateAction<SitePerformancePeriodTypeEnum>>;
}

export interface SitePerformancePurchasesPayloadInterface {
	site: string;
	lookup: { period: number; unit: string };
	excludeTotalPriceZero: boolean;
}

export interface SitePerformancePurchasesAxiosGetInterface {
	data: {
		type: string;
		attributes: SPCDataInterface;
	};
}
