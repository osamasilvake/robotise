import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceWifiHeatmapInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SWContentInterface | null;
}

export interface SWContentInterface extends JsonAPIResponseInterface {
	data: SWCDataInterface[];
	maps: SWCMapsInterface;
}

export interface SWCDataInterface {
	id: string;
	x: number;
	y: number;
	signalStrength: number;
}

export interface SWCMapsInterface {
	data: SWCMapsDataInterface[];
	state?: SWCMapsStateInterface;
}

export interface SWCMapsDataInterface {
	id: string;
	floor: { id: string };
	floorName: string;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SWCMapsStateInterface {
	pSiteId?: string;
	floor?: string;
	floorId?: string;
	mapId?: string;
}
