import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';
import { SitesSliceResponseInterface } from '../sites/Sites.slice.interface';

export interface RobotsSliceInterface {
	loading: boolean;
	content: RobotsSliceResponseAllInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RobotsSliceResponseAllInterface {
	data: RobotsSliceResponseAllDataInterface[];
	dataById: RobotsSliceDataByIdInterface;
	meta: JsonApiMeta;
	backup?: {
		sites: SitesSliceResponseInterface;
	};
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

export interface RobotsSliceDataByIdInterface {
	[key: string]: RobotsSliceResponseDataInterface;
}

export interface RobotsSliceResponseAllDataAlertsInterface {
	danger: number;
	warning: number;
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

export interface RobotsSliceResponseDataSiteInterface {
	id: string;
}

export interface RobotsSliceResponseDataRobotTwinInterface {
	id: string;
}
