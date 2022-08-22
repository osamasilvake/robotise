import { BarChartDataInterface } from '../../../../../../../utilities/charts/bar-chart/BarChart.interface';
import { SitePerformancePeriodTypeEnum } from '../../period/SitePerformancePeriod.enum';

export interface SitePerformanceDemographyPurchasesInterface {
	currentPeriod: SitePerformancePeriodTypeEnum;
	chart: BarChartDataInterface[] | null;
	currency?: string;
}
