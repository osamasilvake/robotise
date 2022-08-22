import { SitePerformancePeriodTypeEnum } from '../../../screens/business/sites/content/performance/period/SitePerformancePeriod.enum';

export interface StackedBarChartInterface {
	currentPeriod: SitePerformancePeriodTypeEnum;
	data: StackedBarChartDataInterface[];
	axisX: string;
	axisY1: string;
	axisY2: string;
	fills: string[];
	barCategoryGap?: number;
	gridLinesHorizontal?: boolean;
}

export interface StackedBarChartDataInterface {
	x: string;
	y1: number;
	y2: number;
}
