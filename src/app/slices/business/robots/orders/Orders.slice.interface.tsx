import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../../JsonApi.interface';

export interface SliceOrdersInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SOContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SOContentInterface {
	data: SOCDataInterface[];
	meta: JsonApiMeta;
	state?: SOCStateInterface;
}

export interface SOCDataInterface {
	id: string;
	location: string;
	mode: string;
	status: string;
	origin: string;
	isDebug: boolean;
	updatedAt: string;
	createdAt: string;
	history: SOCDataHistoryInterface[];
	site: SOCDataSiteInterface;
	robot: SOCRobotInterface;
}

export interface SOCStateInterface {
	robotId?: string;
	page?: number;
	rowsPerPage?: number;
	activeOrders?: boolean;
	debug?: boolean;
}

export interface SOCDataHistoryInterface {
	event: string;
	details: string;
	createdAt: string;
}

export interface SOCDataSiteInterface {
	id: string;
}

export interface SOCRobotInterface {
	id: string;
}
