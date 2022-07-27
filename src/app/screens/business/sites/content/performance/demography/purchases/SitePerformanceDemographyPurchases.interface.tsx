import { BarChartDataInterface } from '../../../../../../../utilities/charts/bar-chart/BarChart.interface';

export interface SitePerformanceDemographyPurchasesInterface {
	chart: BarChartDataInterface[] | null;
	currency?: string;
}
