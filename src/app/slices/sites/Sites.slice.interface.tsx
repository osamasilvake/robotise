import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';

export interface SliceSitesInterface {
	loader: boolean;
	loading: boolean;
	content: SSContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SSContentInterface {
	data: ISite[];
	dataById: SSContentDataByIdInterface;
	meta: JsonApiMeta;
}

export interface SSContentDataByIdInterface {
	[id: string]: ISite;
}

export interface ISite {
	id: string;
	robots?: string[];
	title: string;
	timezone: string;
	currency: string;
	elevators?: {
		vendor?: string;
		buildingId?: string;
		deviceId?: string;
	};
	serviceTime: {
		startTimeLocal: string;
		endTimeLocal: string;
		serviceDays: Day[];
		holidaysSets?: string[];
		holidaysExtra?: string[];
	};
	rooms: {
		whitelist: string[] | null;
	};
	acceptOrders: boolean;
	phone?: {
		technicianPhone?: string;
		callerPhonePrefix?: string;
	};
	createdAt: Date;
	updatedAt: Date;
}

type Day = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
