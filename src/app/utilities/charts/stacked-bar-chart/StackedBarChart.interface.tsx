export interface StackedBarChartInterface {
	data: StackedBarChartDataInterface[];
	axisX: string;
	axisY1: string;
	axisY2: string;
}

export interface StackedBarChartDataInterface {
	x: string;
	y1: number;
	y2: number;
}
