import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { IAlertInterface } from './RobotTwins.slice.interface';

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
	robotBatteryPercentage: number;
	robotMission: { status: string; description: string };
	robotCustomerName: string;
	robotUsername: string;
	robotIPAddress: string;
	robotNote: string;
	robotHidden: boolean;
	robotOnlineCheckDisabled: boolean;
	robotAlerts: RTSContentAlertsInterface;
	robotLastSyncedProducts: Date;
	siteId: string;
	siteTitle: string;
	siteCurrency: string;
	siteAcceptOrders: boolean;
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

export interface IRobotTwinSummaryInterface {
	id: string;
	updatedAt: Date;
	robot: { id: string };
	site: { id: string };
	state: {
		reported: {
			alerts: IAlertInterface[];
			customerName: string;
			isHidden: boolean;
			isOnlineCheckDisabled: boolean;
			lastSyncedProducts: Date;
			name: string;
			note: string;
			robotState: { isReady: boolean };
			ca: {
				ip: string;
				username: string;
			};
			status: {
				batteryState: { percentage: number };
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
			lastSyncedProducts: {
				updatedAt: Date;
			};
			name: {
				updatedAt: Date;
			};
			robotState: {
				isReady: {
					updatedAt: Date;
				};
			};
			status: {
				batteryState: {
					updatedAt: Date;
				};
				controlMode: {
					updatedAt: Date;
				};
				location: {
					updatedAt: Date;
				};
				mission: {
					updatedAt: Date;
				};
			};
		};
	};
}

export interface RTSContentTransformDataInterface {
	id: string;
	updatedAt: Date;
	robot: {
		id: string;
		name: string;
		customerName: string;
		note: string;
		isHidden: boolean;
		isOnlineCheckDisabled: boolean;
		ca: {
			ip: string;
			username: string;
		};
		alerts: {
			value: IAlertInterface[];
			updatedAt: Date;
		};
		lastSyncedProducts: {
			updatedAt: Date;
		};
		robotState: {
			isReady: {
				value: boolean;
				updatedAt: Date;
			};
		};
	};
	site: {
		id: string;
	};
	status: {
		batteryState: {
			value: {
				percentage: number;
			};
			updatedAt: Date;
		};
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
}
