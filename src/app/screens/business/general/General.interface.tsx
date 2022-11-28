import { AECDataInterface } from '../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import { SAODataInterface } from '../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { APCDataInterface } from '../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.interface';
import { ASLDataInterface } from '../../../slices/business/general/all-sms-list/AllSMSList.slice.interface';
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

export interface GeneralAllElevatorCallsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: AECDataInterface;
	}[];
}

export interface GeneralAllPhoneCallsAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: APCDataInterface;
	}[];
}

export interface GeneralAllSMSListAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: ASLDataInterface;
	}[];
}

export interface GeneralOrderModesAxiosGetInterface extends JsonAPIResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: SGOOrderModeContentDataInterface;
	}[];
}
