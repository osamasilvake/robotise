import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

export interface SliceGeneralOperationsInterface {
	orderModes: {
		loading: boolean;
		content: SGOOrderModesContentInterface | null;
	};
}

export interface SGOOrderModesContentInterface extends JsonAPIResponseInterface {
	data: SGOOrderModeContentDataInterface[];
	dataById: SGOOrderModeContentDataByIdInterface;
	dataStringList: string[];
}

export interface SGOOrderModeContentDataInterface {
	title: string;
	mode: string;
}

export interface SGOOrderModeContentDataByIdInterface {
	[id: string]: string;
}
