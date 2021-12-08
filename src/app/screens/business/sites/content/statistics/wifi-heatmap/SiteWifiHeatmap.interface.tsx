import { SliceRobotInterface } from '../../../../../../slices/business/robots/Robot.slice.interface';
import { SliceWifiHeatmapInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';

export interface SiteWifiHeatmapInterface {
	robot: SliceRobotInterface;
	wifiHeatmap: SliceWifiHeatmapInterface;
}

export interface SiteWifiHeatmapCardInterface {
	robot: SliceRobotInterface;
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
