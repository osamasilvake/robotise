import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { IAlert } from './RobotTwins.slice.interface';

export interface SliceRobotTwinsSummaryInterface {
	loader: boolean;
	loading: boolean;
	content: RTSContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RTSContentInterface {
	data: RTSContentDataInterface[];
	dataById: RTSContentDataByIdInterface;
	alerts?: RTSContentAlertsInterface;
}

export interface RTSContentDataInterface {
	id: string;
	robotTitle: string;
	robotId: string;
	siteId: string;
	siteTitle: string;
	siteCurrency: string;
	isReady: boolean;
	acceptOrders: boolean;
	updatedAt: Date;
	alerts: RTSContentAlertsInterface;
}

export interface RTSContentDataByIdInterface {
	[id: string]: RTSContentTransformDataInterface;
}

export interface RTSContentAlertsInterface {
	count?: number;
	danger: number;
	warning: number;
}

export interface RTSContentTransformDataInterface {
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
