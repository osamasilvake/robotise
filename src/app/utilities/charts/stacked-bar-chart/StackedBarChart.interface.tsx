export interface StackedBarChartInterface {
	data: StackedBarChartDataInterface[];
	x: string;
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
