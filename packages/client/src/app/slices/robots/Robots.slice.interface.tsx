import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';

export interface RobotsSliceInterface {
	loading: boolean;
	content: RobotsSliceResponseAllInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RobotsSliceResponseAllInterface {
	data: RobotsSliceResponseAllDataInterface[];
	dataById: RobotsSliceDataByIdInterface;
	meta: JsonApiMeta;
}
export interface RobotsSliceResponseAllDataInterface {
	id: string;
	name: string;
	siteId: string;
	siteTitle: string;
	updatedAt: string;
	isReady: boolean;
	alerts: RobotsSliceResponseAllDataAlertsInterface;
}

export interface RobotsSliceResponseAllDataAlertsInterface {
	danger: number;
	warning: number;
}

export interface RobotsSliceResponseInterface {
	data: RobotsSliceResponseDataInterface[];
	dataById: RobotsSliceDataByIdInterface;
	meta: JsonApiMeta;
}

export interface RobotsSliceResponseDataInterface {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	customerName: string;
	site: RobotsSliceResponseDataSiteInterface;
	robotTwin: RobotsSliceResponseDataRobotTwinInterface;
}

export interface RobotsSliceDataByIdInterface {
	[key: string]: RobotsSliceResponseDataInterface;
}

export interface RobotsSliceResponseDataSiteInterface {
	id: string;
}

export interface RobotsSliceResponseDataRobotTwinInterface {
	id: string;
}
