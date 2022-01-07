import { SliceRobotOperationsInterface } from '../../../../../../slices/business/robots/RobotOperations.slice.interface';
import { SliceWifiHeatmapInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';

export interface SiteWifiHeatmapInterface {
	robotOperations: SliceRobotOperationsInterface;
	wifiHeatmap: SliceWifiHeatmapInterface;
}

export interface SiteWifiHeatmapCardInterface {
	robotOperations: SliceRobotOperationsInterface;
	wifiHeatmap: SliceWifiHeatmapInterface;
	name: string;
}

export interface SiteWifiHeatmapRatioInterface {
	x: number;
	y: number;
	cx: number;
	cy: number;
}

export interface SiteWifiHeatmapCoordinatesInterface {
	x: number;
	y: number;
	oX: number;
	oY: number;
	value: number;
}

export interface SiteWifiHeatmapCardPointsInterface {
	points: SiteWifiHeatmapCoordinatesInterface[];
}
