import { Dispatch, SetStateAction } from 'react';

import { SliceWifiHeatmapInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';
import { SiteWifiHeatmapPeriodsTypeEnum } from './SiteWifiHeatmap.enum';

export interface SiteWifiHeatmapInterface {
	wifiHeatmap: SliceWifiHeatmapInterface;
}

export interface SiteWifiHeatmapPeriodInterface {
	period: SiteWifiHeatmapPeriodsTypeEnum;
	setPeriod: Dispatch<SetStateAction<SiteWifiHeatmapPeriodsTypeEnum>>;
}

export interface SiteWifiHeatmapFloorInterface {
	wifiHeatmap: SliceWifiHeatmapInterface;
	floor: string;
	setFloor: Dispatch<SetStateAction<string | undefined>>;
	setName: Dispatch<SetStateAction<string | undefined>>;
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

export interface SiteWifiHeatmapDownloadInterface {
	siteName: string | undefined;
	floor: string | undefined;
}
