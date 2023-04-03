import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

export interface SliceGeneralOperationsInterface {
	orderModes: {
		loading: boolean;
		content: SGOOrderModesContentInterface | null;
	};
	productCategories: {
		loading: boolean;
		content: SGOProductCategoriesContentInterface | null;
	};
	reports: {
		loading: boolean;
	};
}

export interface SGOOrderModesContentInterface extends JsonAPIResponseInterface {
	data: SGOOrderModeContentDataInterface[];
	dataById: SGOOrderModeContentDataByIdInterface;
}

export interface SGOOrderModeContentDataInterface {
	title: string;
	mode: string;
}

export interface SGOOrderModeContentDataByIdInterface {
	[id: string]: string;
}

export interface SGOProductCategoriesContentInterface {
	data: SGOProductCategoriesContentDataInterface[];
}

export interface SGOProductCategoriesContentDataInterface {
	name: string;
}
