export interface StackedAreaChartInterface {
	data: StackedAreaChartDataInterface[];
	x: string;
	axisX: string;
	axisY1: string;
	axisY2: string;
	axisY3: string;
	fills: string[];
	barCategoryGap?: number;
	gridLinesHorizontal?: boolean;
}

export interface StackedAreaChartDataInterface {
	x: string;
	y1: number;
	y2: number;
	y3: number;
}
