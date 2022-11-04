import {
	SitePerformancePeriodTypeEnum,
	SitePerformancePeriodUnitEnum
} from './SitePerformancePeriod.enum';
import { SitePerformancePeriodListInterface } from './SitePerformancePeriod.interface';

export const sitePerformancePeriod: SitePerformancePeriodListInterface[] = [
	{
		id: SitePerformancePeriodTypeEnum.DAY,
		unit: SitePerformancePeriodUnitEnum.DAY,
		label: 'PERIOD.DAY',
		period: 7
	},
	{
		id: SitePerformancePeriodTypeEnum.WEEK4,
		unit: SitePerformancePeriodUnitEnum.WEEK,
		label: 'PERIOD.WEEK4',
		period: 4
	},
	{
		id: SitePerformancePeriodTypeEnum.WEEK8,
		unit: SitePerformancePeriodUnitEnum.WEEK,
		label: 'PERIOD.WEEK8',
		period: 8
	},
	{
		id: SitePerformancePeriodTypeEnum.MONTH,
		unit: SitePerformancePeriodUnitEnum.MONTH,
		label: 'PERIOD.MONTH',
		period: 12
	}
];
