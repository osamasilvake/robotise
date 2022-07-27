import { StackedAreaChartDataInterface } from '../../../../../../../utilities/charts/stacked-area-chart/StackedAreaChart.interface';

export interface SitePerformanceDemographyInventoryInterface {
	chart: StackedAreaChartDataInterface[] | null;
	currency?: string;
}
