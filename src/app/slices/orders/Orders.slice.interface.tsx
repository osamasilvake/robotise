import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';

export interface SliceOrdersInterface {
	loader: boolean;
	loading: boolean;
	executing: boolean;
	content: SOContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SOContentInterface {
	data: SOCDataInterface[];
	dataById: SOCDataByIdInterface;
	robot: SOCRobotInterface;
	meta: JsonApiMeta;
}

export interface SOCDataInterface {
	id: string;
	room: string;
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

export interface SOCDataByIdInterface {
	[id: string]: SOCDataInterface;
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
