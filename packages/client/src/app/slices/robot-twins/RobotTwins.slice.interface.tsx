import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface RTSInterface {
	loading: boolean;
	content: RTSResponseInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RTSResponseInterface {
	data: RTSResponseDataInterface[];
	dataById: RTSResponseDataByIdInterface;
	alerts?: RTSResponseAllAlertsInterface;
}

export interface RTSResponseDataInterface {
	id: string;
	updatedAt: string;
	robot: {
		id: string;
	};
	robotState: {
		isReady: RTSResponseDataType<boolean>;
	};
	alerts: {
		updatedAt: string;
		value: RTSResponseDataAlertsValueInterface[];
	};
}

export interface RTSResponseDataByIdInterface {
	[key: string]: RTSResponseDataInterface;
}

export interface RTSResponseDataAlertsValueInterface {
	code: string;
	conditions: string[];
	createdAt: string;
	level: string;
	message: string;
	origin: string;
}

export interface RTSResponseAllAlertsInterface {
	danger: number;
	warning: number;
}

export interface RTSResponseDataType<T> {
	updatedAt: string;
	value: T;
}
