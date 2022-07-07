import { t } from 'i18next';

import { PerformanceChartPeriodTypeEnum } from './charts/SitePerformanceCharts.enum';
import { PerformancePeriodListInterface } from './SitePerformance.interface';

export const performancePeriod: PerformancePeriodListInterface[] = [
	{ id: PerformanceChartPeriodTypeEnum.WEEK, label: t('CHARTS.PERIOD.WEEK') },
	{ id: PerformanceChartPeriodTypeEnum.MONTH, label: t('CHARTS.PERIOD.MONTH') }
];
