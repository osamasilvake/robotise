import { StackedBarChartDataInterface } from '../../../../../../../utilities/charts/stacked-bar-chart/StackedBarChart.interface';
import { SitePerformancePeriodTypeEnum } from '../../period/SitePerformancePeriod.enum';

export interface SitePerformanceDemographyOrdersInterface {
	currentPeriod: SitePerformancePeriodTypeEnum;
	chart: StackedBarChartDataInterface[] | null;
}
