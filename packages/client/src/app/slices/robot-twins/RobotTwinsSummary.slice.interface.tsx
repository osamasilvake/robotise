import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';
import { SitesSliceResponseInterface } from '../sites/Sites.slice.interface';

export interface RTSSInterface {
	loading: boolean;
	content: RTSSContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RTSSContentInterface {
	data: RTSSDataResponseInterface[];
	dataById: RTSSDataByIdInterface;
	meta: JsonApiMeta;
	backup?: {
		sites: SitesSliceResponseInterface;
	};
}

export interface RTSSDataInterface {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	customerName: string;
	site: RTSSDataSiteInterface;
	robotTwin: RTSSDataRobotTwinInterface;
}

export interface RTSSDataByIdInterface {
	[key: string]: RTSSDataInterface;
}

export interface RTSSDataSiteInterface {
	id: string;
}

export interface RTSSDataRobotTwinInterface {
	id: string;
}

// content -> data
export interface RTSSDataResponseInterface {
	id: string;
	name: string;
	siteId: string;
	siteTitle: string;
	updatedAt: string;
	isReady: boolean;
	alerts: RTSSDataResponseAlertsInterface;
}

export interface RTSSDataResponseAlertsInterface {
	danger: number;
	warning: number;
}
