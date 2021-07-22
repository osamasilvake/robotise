import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { RobotDetailControlModeTypeEnum } from '../../screens/business/robots/content/detail/commands/RobotDetailCommands.enum';

export interface SliceRobotTwinsInterface {
	loader: boolean;
	loading: boolean;
	content: SRTContentDataInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SRTContentDataInterface {
	id: string;
	updatedAt: Date;
	site: SRTContentSiteInterface;
	robot: SRTContentRobotInterface;
	robotState: SRTContentRobotStateInterface;
	alerts: SRTContentAlertsInterface;
	controlMode: SRTContentControlModeInterface;
	missionStatus: SRTContentMissionStatusInterface;
	location?: SRTContentLocationInterface | undefined;
	cameras?: SRTContentCameraInterface | undefined;
	batteryState?: SRTContentBatteryStateInterface | undefined;
	dockingState?: SRTContentDockingStateInterface | undefined;
	joystickState?: SRTContentJoystickState | undefined;
	activityState?: SRTContentActivityState | undefined;
	safetySensorsState?: SRTContentSafetySensorsState | undefined;
	safetySystemsState?: SRTContentSafetySystemsState | undefined;
}

export interface SRTContentSiteInterface {
	id: string;
	title?: string;
	acceptOrders?: boolean;
	elevator?: {
		vendor?: string;
		buildingId?: string;
		deviceId?: string;
	};
}

export interface SRTContentRobotInterface {
	id: string;
	name: string;
	customerName: string;
}

export interface SRTContentRobotStateInterface {
	isReady: {
		value: boolean;
		updatedAt: Date;
	};
}

export interface SRTContentAlertsInterface {
	value: IAlert[];
	updatedAt: Date;
}

export interface SRTContentControlModeInterface {
	value: RobotDetailControlModeTypeEnum;
	updatedAt: Date;
}

export interface SRTContentMissionStatusInterface {
	value: string;
	updatedAt: Date;
}

export interface SRTContentLocationInterface {
	value: ILocation;
	updatedAt: Date;
}

export interface SRTContentCameraInterface {
	base: {
		imageId: {
			value: string;
			updatedAt: Date;
		};
	};
	top: {
		imageId: {
			value: string;
			updatedAt: Date;
		};
	};
}

export interface SRTContentBatteryStateInterface {
	properties: {
		current: number;
		percentage: number;
		powerSupplyStatus: string;
		powerSupplyHealth: string;
		voltage: number;
	};
	updatedAt: Date;
}

export interface SRTContentDockingStateInterface {
	properties: {
		isDocked: boolean;
	};
	updatedAt: Date;
}

export interface SRTContentJoystickState {
	properties: {
		isConnected: boolean;
	};
	updatedAt: Date;
}

export interface SRTContentActivityState {
	properties: {
		latest: string;
	};
	updatedAt: Date;
}

export interface SRTContentSafetySensorsState {
	properties: {
		drawers: {
			0: boolean;
			1: boolean;
			2: boolean;
			3: boolean;
			4: boolean;
		}[];
		fallProtectionBackLeft: boolean;
		fallProtectionBackRight: boolean;
		fallProtectionFrontLeft: boolean;
		fallProtectionFrontRight: boolean;
		lidarBottom: boolean;
		lidarTop: boolean;
		magnetSensorLeft: boolean;
		magnetSensorRight: boolean;
		safetyEdge: boolean;
	};
	updatedAt: Date;
}

export interface SRTContentSafetySystemsState {
	properties: {
		backMutingActive: boolean;
		brakeReleasePressed: boolean;
		brakeReleased: boolean;
		driveTorqueEnabled: boolean;
		estopSwitchReleased: boolean;
		forceBrakeActive: boolean;
		forceStop0Active: boolean;
		frontMutingActive: boolean;
		noDriveStop: boolean;
		noStop0: boolean;
		noStop1: boolean;
		noStop2Trigger: boolean;
		stop0ResetRequired: boolean;
		stop1ResetRequired: boolean;
	};
	updatedAt: Date;
}

export interface IRobotTwin {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	robot: {
		id: string;
	};
	site: {
		id: string;
	};
	state: {
		reported: {
			name: string;
			customerName: string;
			robotState: {
				isReady: boolean;
			};
			alerts: IAlert[];
			cameras: {
				[key: string]: {
					imageId: string;
				};
			};
			status: {
				controlMode: RobotDetailControlModeTypeEnum;
				missionStatus: string;
				location: {
					mapName: string;
					floor: string;
					x: number;
					y: number;
					yaw: number;
				};
				batteryState: {
					current: number;
					percentage: number;
					powerSupplyStatus: string;
					powerSupplyHealth: string;
					voltage: number;
				};
				isDocked: boolean;
				isJoystickConnected: boolean;
				safetySensors: {
					drawers: {
						0: boolean;
						1: boolean;
						2: boolean;
						3: boolean;
						4: boolean;
					}[];
					fallProtectionBackLeft: boolean;
					fallProtectionBackRight: boolean;
					fallProtectionFrontLeft: boolean;
					fallProtectionFrontRight: boolean;
					lidarBottom: boolean;
					lidarTop: boolean;
					magnetSensorLeft: boolean;
					magnetSensorRight: boolean;
					safetyEdge: boolean;
				};
				safetySystem: {
					backMutingActive: boolean;
					brakeReleasePressed: boolean;
					brakeReleased: boolean;
					driveTorqueEnabled: boolean;
					estopSwitchReleased: boolean;
					forceBrakeActive: boolean;
					forceStop0Active: boolean;
					frontMutingActive: boolean;
					noDriveStop: boolean;
					noStop0: boolean;
					noStop1: boolean;
					noStop2Trigger: boolean;
					stop0ResetRequired: boolean;
					stop1ResetRequired: boolean;
				};
			};
			activity: string;
		};
	};
	metadata: {
		reported: {
			name: {
				updatedAt: Date;
			};
			customerName: {
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
			cameras: {
				[key: string]: {
					imageId: {
						updatedAt: Date;
					};
				};
			};
			status: {
				controlMode: {
					updatedAt: Date;
				};
				missionStatus: {
					updatedAt: Date;
				};
				location: {
					updatedAt: Date;
				};
				batteryState: {
					updatedAt: Date;
				};
				isDocked: {
					updatedAt: Date;
				};
				isJoystickConnected: {
					updatedAt: Date;
				};
				safetySensors: {
					updatedAt: Date;
				};
				safetySystem: {
					updatedAt: Date;
				};
			};
			activity: {
				updatedAt: Date;
			};
		};
	};
}

export interface IOrderQueue {
	id: string;
	status: string;
}

export interface IAlert {
	code: string;
	conditions: IAlertRulesCondition[];
	createdAt: Date;
	level: string;
	message: string;
	notes?: string;
	updatedAt?: Date;
}

export interface IAlertRulesCondition {
	field: string;
	condition: string;
	value: boolean | string | number;
	currentValue: boolean | string | number;
}

export interface ILocation {
	mapName: string;
	floor: string;
	x: number;
	y: number;
	yaw: number;
}
