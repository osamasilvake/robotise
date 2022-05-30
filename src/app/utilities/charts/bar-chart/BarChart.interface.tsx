export interface BarChartInterface {
	data: BarChartDataInterface[];
	axisX: string;
	axisY: string;
}

export interface BarChartDataInterface {
	x: string;
	y: number;
}
