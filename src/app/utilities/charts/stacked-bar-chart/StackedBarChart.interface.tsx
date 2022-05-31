export interface StackedBarChartInterface {
	data: StackedBarChartDataInterface[];
	x: string;
	axisX: string;
	axisY1: string;
	axisY2: string;
	axisY3: string;
}

export interface StackedBarChartDataInterface {
	x: string;
	y1: number;
	y2: number;
	y3: number;
}
