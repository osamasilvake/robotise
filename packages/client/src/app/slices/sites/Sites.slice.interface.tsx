import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';

export interface SitesSliceInterface {
	loading: boolean;
	content: SitesSliceResponseInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SitesSliceResponseInterface {
	data: SitesSliceResponseDataInterface[];
	dataById: SitesSliceResponseDataByIdInterface;
	meta: JsonApiMeta;
}

export interface SitesSliceResponseDataInterface {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	timezone: string;
	acceptOrders: boolean;
	rooms: SitesSliceResponseDataRoomsInterface;
	serviceTime: SitesSliceResponseDataServiceTimeInterface;
}

export interface SitesSliceResponseDataByIdInterface {
	[key: string]: SitesSliceResponseDataInterface;
}

export interface SitesSliceResponseDataRoomsInterface {
	whitelist: number[];
	available: number[];
}

export interface SitesSliceResponseDataServiceTimeInterface {
	serviceDays: number[];
}
