import { SitePerformancePeriodTypeEnum } from '../../../screens/business/sites/content/performance/period/SitePerformancePeriod.enum';

export interface BarChartInterface {
	currentPeriod: SitePerformancePeriodTypeEnum;
	data: BarChartDataInterface[];
	cwLabel: string;
	axisX: string;
	axisY: string;
	language: string;
	currency?: string;
}

export interface BarChartDataInterface {
	x: string;
	y: number;
}
