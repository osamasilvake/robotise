import { SliceWifiHeatmapInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';

export interface SiteWifiHeatmapInterface {
	wifiHeatmap: SliceWifiHeatmapInterface;
}

export interface SiteWifiHeatmapCardInterface {
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
