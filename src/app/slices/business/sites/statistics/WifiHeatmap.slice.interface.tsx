import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceWifiHeatmapInterface {
	loader: boolean;
	loading: boolean;
	content: SWContentInterface | null;
}

export interface SWContentInterface extends JsonAPIResponseInterface {
	data: SWCDataInterface[];
}

export interface SWCDataInterface {
	id: string;
	x: number;
	y: number;
	signalStrength: number;
}
