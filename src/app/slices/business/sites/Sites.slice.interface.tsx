import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

export interface SliceSitesInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SSContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SSContentInterface extends JsonAPIResponseInterface {
	data: ISite[];
	dataById: SSCDataByIdInterface;
	state?: SSCStateInterface;
}

export interface SSCDataByIdInterface {
	[id: string]: ISite;
}

export interface SSCStateInterface {
	showHidden?: boolean;
}

export interface ISite {
	id: string;
	title: string;
	timezone: string;
	currency: string;
	acceptOrders: boolean;
	acceptOrdersLastModifiedAt: Date;
	acceptOrdersLastModifiedOrigin: string;
	createdAt: Date;
	updatedAt: Date;
	configs: {
		defaultOrderMode: string;
		availableOrderModes: string[];
		helpPage: string;
		codeOrdersEnabled: boolean;
		showEmergencyWorkflow: boolean;
		isHidden: boolean;
	};
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
	actions: {
		action: string;
		createdAt: Date;
		createdBy: string;
	}[];
}

type Day = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
