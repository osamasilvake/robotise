import { SitePerformancePeriodListInterface } from '../SitePerformance.interface';
import { SitePerformancePeriodTypeEnum } from './SitePerformancePeriod.enum';

export const sitePerformancePeriod: SitePerformancePeriodListInterface[] = [
	{
		id: SitePerformancePeriodTypeEnum.DAY,
		label: 'PERIOD.DAY',
		period: 7
	},
	{
		id: SitePerformancePeriodTypeEnum.WEEK,
		label: 'PERIOD.WEEK',
		period: 8
	},
	{
		id: SitePerformancePeriodTypeEnum.MONTH,
		label: 'PERIOD.MONTH',
		period: 12
	}
];
