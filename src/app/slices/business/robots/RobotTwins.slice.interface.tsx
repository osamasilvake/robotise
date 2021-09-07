import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { RobotDetailControlModeTypeEnum } from '../../../screens/business/robots/content/detail/commands/RobotDetailCommands.enum';

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
	mission: SRTContentMissionInterface;
	location?: SRTContentLocationInterface | undefined;
	cameras?: SRTContentCameraInterface | undefined;
	batteryState?: SRTContentBatteryStateInterface | undefined;
	dockingState?: SRTContentDockingStateInterface | undefined;
	joystickState?: SRTContentJoystickState | undefined;
	activityState?: SRTContentActivityState | undefined;
	safetySensors?: SRTContentSafetySensors | undefined;
	safetySystems?: SRTContentSafetySystems | undefined;
	computerInfo?: SRTContentComputerInfo | undefined;
	humanPerception?: SRTContentHumanPerception | undefined;
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
	note: string;
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

export interface SRTContentMissionInterface {
	status: string;
	description: string;
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

export interface SRTContentSafetySensors {
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

export interface SRTContentSafetySystems {
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

export interface SRTContentComputerInfo {
	properties: {
		cpuLoad: {
			cpu: number[];
			average: number;
		};
		memoryUsage: {
			total: number;
			used: number;
			free: number;
			shared: number;
			cached: number;
			available: number;
			swapFree: number;
			swapTotal: number;
			swapUsed: number;
		};
		wifiStatus: {
			interface: string;
			essid: string;
			signalStrength: number;
		};
		hardDrives: {
			name: string;
			size: number;
			used: number;
			available: number;
			capacityPercents: number;
			status: string;
			mountPoint: string;
		}[];
	};
	updatedAt: Date;
}

export interface SRTContentHumanPerception {
	properties: {
		legsCloseCount: number;
		legsFarCount: number;
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
			note: string;
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
				mission: {
					status: string;
					description: string;
				};
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
				computerInfo: {
					cpuLoad: {
						cpu: number[];
						average: number;
					};
					memoryUsage: {
						total: number;
						used: number;
						free: number;
						shared: number;
						cached: number;
						available: number;
						swapFree: number;
						swapTotal: number;
						swapUsed: number;
					};
					wifiStatus: {
						interface: string;
						essid: string;
						signalStrength: number;
					};
					hardDrives: {
						name: string;
						size: number;
						used: number;
						available: number;
						capacityPercents: number;
						status: string;
						mountPoint: string;
					}[];
				};
				humanPerception: {
					legsCloseCount: number;
					legsFarCount: number;
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
			note: {
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
				mission: {
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
				computerInfo: {
					updatedAt: Date;
				};
				humanPerception: {
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
