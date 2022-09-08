import { SAODataInterface } from '../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { SECDataInterface } from '../../../slices/business/general/emails/Emails.slice.interface';
import { SGOOrderModeContentDataInterface } from '../../../slices/business/general/GeneralOperations.slice.interface';
import { JsonAPIResponseInterface } from '../../../slices/JsonAPI.interface';

export interface GeneralEmailsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SECDataInterface;
	}[];
}

export interface GeneralEmailAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SECDataInterface;
	};
}

export interface GeneralAllOrdersAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SAODataInterface;
	}[];
}

export interface GeneralAllOrderAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SAODataInterface;
	};
}

export interface GeneralOrderModesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SGOOrderModeContentDataInterface;
	}[];
}
