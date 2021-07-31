import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { IAlert } from './RobotTwins.slice.interface';

export interface SliceRobotTwinsSummaryInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: RTSContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RTSContentInterface {
	data: RTSContentDataInterface[];
	dataById: RTSContentDataByIdInterface;
	alerts?: RTSContentAlertsInterface;
	state?: RTSContentStateInterface;
}

export interface RTSContentDataInterface {
	id: string;
	updatedAt: Date;
	robotId: string;
	robotTitle: string;
	robotIsReady: boolean;
	robotControlMode: string;
	robotMission: {
		status: string;
		description: string;
	};
	robotCustomerName: string;
	robotHidden: boolean;
	robotOnlineCheckDisabled: boolean;
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

export interface RTSContentStateInterface {
	hidden?: boolean;
}

export interface RTSContentTransformDataInterface {
	id: string;
	updatedAt: Date;
	robot: {
		id: string;
		name: string;
		customerName: string;
		isHidden: boolean;
		isOnlineCheckDisabled: boolean;
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
		mission: {
			status: string;
			description: string;
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
			customerName: string;
			lastSyncedProducts: Date;
			isHidden: boolean;
			isOnlineCheckDisabled: boolean;
			alerts: IAlert[];
			robotState: {
				isReady: boolean;
			};
			status: {
				controlMode: string;
				mission: {
					status: string;
					description: string;
				};
			};
		};
	};
	metadata: {
		reported: {
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
				mission: {
					updatedAt: Date;
				};
			};
		};
	};
}
