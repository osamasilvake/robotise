export interface BarChartInterface {
	data: BarChartDataInterface[];
	x: string;
	axisX: string;
	axisY: string;
}

export interface BarChartDataInterface {
	x: string;
	y: number;
}
