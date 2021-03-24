import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../utilities/serializers/json-api/JsonApi.interface';
import { IAlert } from './RobotTwins.slice.interface';

export interface RTSSInterface {
	loading: boolean;
	content: RTSSContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RTSSContentInterface {
	data: RTSFinalDataInterface[];
	dataById: RTSSDataByIdInterface;
	meta: JsonApiMeta;
	alerts?: RTSAlertsInterface;
}

export interface RTSSDataByIdInterface {
	[id: string]: RTSSMappedResponseDataInterface;
}

// mapped response data
export interface RTSSMappedResponseDataInterface {
	id: string;
	updatedAt: Date;
	robot: {
		id: string;
		name: string;
	};
	site: {
		id: string;
	};
	robotState: {
		isReady: {
			value: boolean;
			updatedAt: Date;
		};
	};
	alerts: {
		value: IAlert[];
		updatedAt: Date;
	};
}

// final data response
export interface RTSFinalDataInterface {
	id: string;
	robotTitle: string;
	robotId: string;
	siteId: string;
	siteTitle: string;
	isReady: boolean;
	acceptOrders: boolean;
	updatedAt: Date;
	alerts: RTSAlertsInterface;
}

export interface RTSAlertsInterface {
	danger: number;
	warning: number;
}

// initial
export interface IRobotTwinSummary {
	id: string;
	robot: {
		id: string;
	};
	site: {
		id: string;
	};
	updatedAt: Date;
	state: {
		reported: {
			name: string;
			robotState: {
				isReady: boolean;
			};
			alerts: IAlert[];
		};
	};
	metadata: {
		reported: {
			name: {
				updatedAt: Date;
			};
			robotState: {
				isReady: {
					updatedAt: Date;
				};
			};
			alerts: {
				updatedAt: Date;
			};
		};
	};
}
