export interface BarChartInterface {
	data: BarChartDataInterface[];
	x: string;
	axisX: string;
	axisY: string;
	language: string;
	currency?: string;
}

export interface BarChartDataInterface {
	x: string;
	y: number;
}
