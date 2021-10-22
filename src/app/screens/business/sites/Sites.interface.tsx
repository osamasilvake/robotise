import {
	SNContentNotificationTypeInterface,
	SNContentNotificationUsersInterface
} from '../../../slices/business/sites/configuration/Notifications.slice.interface';
import { SSCDataInterface } from '../../../slices/business/sites/configuration/ServicePositions.slice.interface';
import { PCCDataInterface as PCCDataAliasInterface } from '../../../slices/business/sites/phone-calls/PhoneCalls.slice.interface';
import { PCCDataInterface } from '../../../slices/business/sites/phone-configs/PhoneConfigs.slice.interface';
import { SPCDataInterface } from '../../../slices/business/sites/products/Products.slice.interface';
import { ISite } from '../../../slices/business/sites/Sites.slice.interface';
import { JsonApiResponse } from '../../../slices/JsonApi.interface';

export interface SitesAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: ISite;
	}[];
}

export interface SiteProductsAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: SPCDataInterface;
	}[];
}

export interface SiteRoomsAxiosPatchRequestInterface {
	data: {
		type: string;
		id: string;
		attributes: {
			rooms: {
				whitelist: string[];
			};
		};
	};
}

export interface SiteRoomsAxiosPatchResponseInterface {
	data: {
		id: string;
		type: string;
		attributes: ISite;
	};
}

export interface SitePhoneConfigsAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: PCCDataInterface;
	}[];
}

export interface SitePhoneCallsAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: PCCDataAliasInterface;
	}[];
}

export interface SiteNotificationTypesAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SNContentNotificationTypeInterface;
	}[];
}

export interface SiteNotificationUsersAxiosGetInterface {
	data: {
		id: string;
		type: string;
		attributes: SNContentNotificationUsersInterface;
	}[];
}

export interface SiteServicePositionsAxiosGetInterface extends JsonApiResponse {
	data: {
		id: string;
		type: string;
		attributes: SSCDataInterface;
	}[];
}
