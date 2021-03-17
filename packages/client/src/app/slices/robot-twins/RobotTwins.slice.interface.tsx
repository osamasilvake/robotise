import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface RobotTwinsSliceInterface {
	loading: boolean;
	content: RobotTwinsSliceResponseInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RobotTwinsSliceResponseInterface {
	data: RobotTwinsSliceResponseDataInterface[];
	dataById: RobotTwinsSliceResponseDataByIdInterface;
	alerts?: RobotTwinsSliceResponseAllAlertsInterface;
}

export interface RobotTwinsSliceResponseDataInterface {
	id: string;
	updatedAt: string;
	robot: {
		id: string;
	};
	robotState: {
		isReady: RobotTwinsSliceResponseDataType<boolean>;
	};
	alerts: {
		updatedAt: string;
		value: RobotTwinsSliceResponseDataAlertsValueInterface[];
	};
}

export interface RobotTwinsSliceResponseDataByIdInterface {
	[key: string]: RobotTwinsSliceResponseDataInterface;
}

export interface RobotTwinsSliceResponseDataAlertsValueInterface {
	code: string;
	conditions: string[];
	createdAt: string;
	level: string;
	message: string;
	origin: string;
}

export interface RobotTwinsSliceResponseAllAlertsInterface {
	danger: number;
	warning: number;
}

export interface RobotTwinsSliceResponseDataType<T> {
	updatedAt: string;
	value: T;
}
