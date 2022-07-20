import { SitePerformancePeriodListInterface } from '../SitePerformance.interface';
import { SitePerformancePeriodTypeEnum } from './SitePerformancePeriod.enum';

export const sitePerformancePeriod: SitePerformancePeriodListInterface[] = [
	{ id: SitePerformancePeriodTypeEnum.DAY, label: 'PERIOD.DAY' },
	{ id: SitePerformancePeriodTypeEnum.WEEK, label: 'PERIOD.WEEK' },
	{ id: SitePerformancePeriodTypeEnum.MONTH, label: 'PERIOD.MONTH' }
];
