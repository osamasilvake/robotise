import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';

export interface OrdersInterface {
	loader: boolean;
	loading: boolean;
	content: OrdersContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface OrdersContentInterface {
	data: OrderDataInterface[];
	dataById: OrdersDataByIdInterface;
	meta: JsonApiMeta;
	robot: OrderDataRobotInterface;
}

export interface OrderDataInterface {
	id: string;
	room: string;
	mode: string;
	status: string;
	origin: string;
	updatedAt: string;
	createdAt: string;
	history: OrderDataHistoryInterface[];
	site: OrderDataSiteInterface;
	robot: OrderDataRobotInterface;
}

export interface OrdersDataByIdInterface {
	[id: string]: OrderDataInterface;
}

export interface OrderDataHistoryInterface {
	event: string;
	details: string;
	createdAt: string;
}

export interface OrderDataSiteInterface {
	id: string;
}

export interface OrderDataRobotInterface {
	id: string;
}
