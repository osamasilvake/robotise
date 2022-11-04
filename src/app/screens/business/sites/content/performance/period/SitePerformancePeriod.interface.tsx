import { Dispatch, SetStateAction } from 'react';

import {
	SitePerformancePeriodTypeEnum,
	SitePerformancePeriodUnitEnum
} from './SitePerformancePeriod.enum';

export interface SitePerformancePeriodInterface {
	sitePerformancePeriod: SitePerformancePeriodListInterface[];
	currentPeriod: SitePerformancePeriodTypeEnum;
	setCurrentPeriod: Dispatch<SetStateAction<SitePerformancePeriodListInterface>>;
}

export interface SitePerformancePeriodListInterface {
	id: SitePerformancePeriodTypeEnum;
	unit: SitePerformancePeriodUnitEnum;
	label: string;
	period: number;
}
