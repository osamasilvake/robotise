import { StackedAreaChartDataInterface } from '../../../../../../../utilities/charts/stacked-area-chart/StackedAreaChart.interface';
import { SitePerformancePeriodTypeEnum } from '../../period/SitePerformancePeriod.enum';

export interface SitePerformanceDemographyInventoryInterface {
	currentPeriod: SitePerformancePeriodTypeEnum;
	chart: StackedAreaChartDataInterface[] | null;
	currency?: string;
}
