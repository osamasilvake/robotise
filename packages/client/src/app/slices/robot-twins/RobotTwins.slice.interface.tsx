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
	updatedAt?: string;
	robot: {
		id: string;
	};
	robotState?: {
		isReady: RobotTwinsSliceResponseDataTypeBoolean;
	};
	motorLeftWheelState?: {
		commandedVelocity: RobotTwinsSliceResponseDataTypeNumber;
		controllerTemperature: RobotTwinsSliceResponseDataTypeNumber;
		controllerVoltage: RobotTwinsSliceResponseDataTypeNumber;
		lastErrorCode: RobotTwinsSliceResponseDataTypeString;
		motorCurrent: RobotTwinsSliceResponseDataTypeNumber;
		position: RobotTwinsSliceResponseDataTypeNumber;
		status: RobotTwinsSliceResponseDataTypeString;
		velocity: RobotTwinsSliceResponseDataTypeNumber;
	};
	motorRightWheelState?: {
		commandedVelocity: RobotTwinsSliceResponseDataTypeNumber;
		controllerTemperature: RobotTwinsSliceResponseDataTypeNumber;
		controllerVoltage: RobotTwinsSliceResponseDataTypeNumber;
		lastErrorCode: RobotTwinsSliceResponseDataTypeString;
		motorCurrent: RobotTwinsSliceResponseDataTypeNumber;
		position: RobotTwinsSliceResponseDataTypeNumber;
		status: RobotTwinsSliceResponseDataTypeString;
		velocity: RobotTwinsSliceResponseDataTypeNumber;
	};
	location?: {
		map: {
			id: string;
			floor?: string;
		};
		point: {
			x: number;
			y: number;
			yaw: number;
		};
		updatedAt: string;
	};
	lidarState?: {
		receivingScans: RobotTwinsSliceResponseDataTypeBoolean;
	};
	joystickState?: {
		controlMode: RobotTwinsSliceResponseDataTypeString;
	};
	emergencyBrakeState?: {
		votedYes: RobotTwinsSliceResponseDataTypeString;
	};
	dockingState?: {
		isDocked: RobotTwinsSliceResponseDataTypeBoolean;
	};
	batteryState?: {
		current: RobotTwinsSliceResponseDataTypeNumber;
		percentage: RobotTwinsSliceResponseDataTypeNumber;
		powerSupplyHealth: RobotTwinsSliceResponseDataTypeString;
		powerSupplyStatus: RobotTwinsSliceResponseDataTypeString;
		voltage: RobotTwinsSliceResponseDataTypeNumber;
	};
	activity?: {
		latest: RobotTwinsSliceResponseDataTypeString;
	};
	cameras?: {
		base: RobotTwinsSliceResponseDataCameraImageString;
		top: RobotTwinsSliceResponseDataCameraImageString;
	};
	muteSensorState?: {
		updatedAt: string;
		value: string;
	};
	drawerStates?: {
		updatedAt: string;
		value: {
			commandType: string;
			drawerId: string;
			drawerType: string;
			isClosed: boolean;
		};
	};
	realsenseState?: {
		processingData: RobotTwinsSliceResponseDataTypeBoolean;
		receivingData: RobotTwinsSliceResponseDataTypeBoolean;
	};
	alerts?: {
		updatedAt: string;
		value: {
			code: string;
			conditions: string[];
			createdAt: string;
			level: string;
			message: string;
			origin: string;
		};
	};
}

export interface RobotTwinsSliceResponseDataByIdInterface {
	[key: string]: RobotTwinsSliceResponseDataInterface;
}

export interface RobotTwinsSliceResponseAllAlertsInterface {
	danger: number;
	warning: number;
}

export interface RobotTwinsSliceResponseDataTypeNumber {
	updatedAt: string;
	value: number;
}

export interface RobotTwinsSliceResponseDataTypeBoolean {
	updatedAt: string;
	value: boolean;
}

export interface RobotTwinsSliceResponseDataTypeString {
	updatedAt: string;
	value: string;
}

export interface RobotTwinsSliceResponseDataCameraImageString {
	updatedAt: string;
	imageId: string;
}
