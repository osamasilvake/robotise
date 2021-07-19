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
	updatedAt: Date;
	robotId: string;
	robotTitle: string;
	robotIsReady: boolean;
	robotControlMode: string;
	robotMissionStatus: string;
	siteId: string;
	siteTitle: string;
	siteCurrency: string;
	siteAcceptOrders: boolean;
	alerts: RTSContentAlertsInterface;
	lastSyncedProducts: Date;
}

export interface RTSContentDataByIdInterface {
	[id: string]: RTSContentDataInterface;
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
	alerts: {
		value: IAlert[];
		updatedAt: Date;
	};
	robotState: {
		isReady: {
			value: boolean;
			updatedAt: Date;
		};
	};
	status: {
		controlMode: {
			value: string;
			updatedAt: Date;
		};
		missionStatus: {
			value: string;
			updatedAt: Date;
		};
	};
	lastSyncedProducts: {
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
			alerts: IAlert[];
			robotState: {
				isReady: boolean;
			};
			status: {
				controlMode: string;
				missionStatus: string;
			};
			lastSyncedProducts: Date;
		};
	};
	metadata: {
		reported: {
			name: {
				updatedAt: Date;
			};
			alerts: {
				updatedAt: Date;
			};
			robotState: {
				isReady: {
					updatedAt: Date;
				};
			};
			status: {
				controlMode: {
					updatedAt: Date;
				};
				missionStatus: {
					updatedAt: Date;
				};
			};
		};
	};
}
