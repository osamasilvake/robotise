import { PerformancePeriodListInterface } from '../SitePerformance.interface';
import { PerformancePeriodTypeEnum } from './SitePerformancePeriod.enum';

export const performancePeriod: PerformancePeriodListInterface[] = [
	{ id: PerformancePeriodTypeEnum.WEEK, label: 'PERIOD.WEEK' },
	{ id: PerformancePeriodTypeEnum.MONTH, label: 'PERIOD.MONTH' }
];
