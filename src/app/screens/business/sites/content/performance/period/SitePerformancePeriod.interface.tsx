import { Dispatch, SetStateAction } from 'react';

import { SitePerformancePeriodTypeEnum } from './SitePerformancePeriod.enum';

export interface SitePerformancePeriodInterface {
	sitePerformancePeriod: SitePerformancePeriodListInterface[];
	currentPeriod: SitePerformancePeriodTypeEnum;
	setCurrentPeriod: Dispatch<SetStateAction<SitePerformancePeriodListInterface>>;
}

export interface SitePerformancePeriodListInterface {
	id: SitePerformancePeriodTypeEnum;
	label: string;
	period: number;
}
