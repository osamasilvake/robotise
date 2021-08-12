import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../JsonApi.interface';

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
	title: string;
	timezone: string;
	currency: string;
	acceptOrders: boolean;
	createdAt: Date;
	updatedAt: Date;
	rooms: {
		available: string[];
		whitelist: string[];
	};
	serviceTime: {
		startTimeLocal: string;
		endTimeLocal: string;
		serviceDays: Day[];
		holidaysSets?: string[];
		holidaysExtra?: string[];
	};
	phone?: {
		technicianPhone?: string;
		callerPhonePrefix?: string;
	};
	elevators?: {
		vendor?: string;
		buildingId?: string;
		deviceId?: string;
	};
	robots: {
		id: string;
	}[];
}

type Day = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
