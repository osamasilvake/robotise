import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { IAlertInterface } from './RobotTwins.slice.interface';

export interface SliceRobotTwinsSummaryInterface {
	init: boolean;
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
	simulation?: boolean;
}

export interface IRobotTwinSummaryInterface {
	id: string;
	updatedAt: Date;
	robot: { id: string };
	site: { id: string };
	state: {
		reported: {
			name: string;
			robotState: { isReady: boolean };
			customerName: string;
			ca: { ip: string; username: string };
			note: string;
			isHidden: boolean;
			isOnlineCheckDisabled: boolean;
			lastSyncedProducts: Date;
			status: {
				batteryState: { percentage: number };
				controlMode: string;
				mission: {
					status: string;
					description: string;
				};
			};
			alerts: IAlertInterface[];
		};
	};
	metadata: {
		reported: {
			name: { updatedAt: Date };
			robotState: { isReady: { updatedAt: Date } };
			lastSyncedProducts: { updatedAt: Date };
			status: {
				batteryState: { updatedAt: Date };
				controlMode: { updatedAt: Date };
				location: { updatedAt: Date };
				mission: { updatedAt: Date };
			};
			alerts: { updatedAt: Date };
		};
	};
}
