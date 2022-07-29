import { Dispatch, SetStateAction } from 'react';

import { SliceWifiHeatmapInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';
import { SiteStatisticsWifiHeatmapPeriodsTypeEnum } from './SiteStatisticsWifiHeatmap.enum';

export interface SiteStatisticsWifiHeatmapInterface {
	wifiHeatmap: SliceWifiHeatmapInterface;
}

export interface SiteStatisticsWifiHeatmapPeriodInterface {
	period: SiteStatisticsWifiHeatmapPeriodsTypeEnum;
	setPeriod: Dispatch<SetStateAction<SiteStatisticsWifiHeatmapPeriodsTypeEnum>>;
}

export interface SiteStatisticsWifiHeatmapFloorInterface {
	wifiHeatmap: SliceWifiHeatmapInterface;
	floor: string;
	setFloor: Dispatch<SetStateAction<string | undefined>>;
	setName: Dispatch<SetStateAction<string | undefined>>;
}

export interface SiteStatisticsWifiHeatmapCardInterface {
	wifiHeatmap: SliceWifiHeatmapInterface;
	name: string;
}

export interface SiteStatisticsWifiHeatmapRatioInterface {
	x: number;
	y: number;
	cx: number;
	cy: number;
}

export interface SiteStatisticsWifiHeatmapCoordinatesInterface {
	x: number;
	y: number;
	oX: number;
	oY: number;
	value: number;
}

export interface SiteStatisticsWifiHeatmapCardPointsInterface {
	points: SiteStatisticsWifiHeatmapCoordinatesInterface[];
}

export interface SiteStatisticsWifiHeatmapDownloadInterface {
	siteName: string | undefined;
	floor: string | undefined;
}
