import { SliceRobotInterface } from '../../../../../../slices/business/robots/Robot.slice.interface';
import { SliceWifiHeatmapInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';

export interface SiteWifiHeatmapInterface {
	robot: SliceRobotInterface;
	wifiHeatmap: SliceWifiHeatmapInterface;
}

export interface SiteHeatmapInterface {
	robot: SliceRobotInterface;
	wifiHeatmap: SliceWifiHeatmapInterface;
	name: string;
}

export interface SiteHeatmapRatioInterface {
	x: number;
	y: number;
	cx: number;
	cy: number;
}

export interface SiteHeatmapCoordinatesInterface {
	x: number;
	y: number;
	value: number;
}

export interface SiteHeatmapConfigInterface {
	container: HTMLElement;
	radius: number;
	maxOpacity: number;
	minOpacity: number;
	blur: number;
	gradient: { [key: string]: string };
}

export interface SiteHeatmapInstanceInterface extends SiteHeatmapInstanceType {
	_renderer?: {
		canvas: HTMLCanvasElement;
	};
}

type SiteHeatmapInstanceType = h337.Heatmap<'value', 'x', 'y'>;
