import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { RobotDetailControlModeTypeEnum } from '../../../screens/business/robots/content/detail/commands/RobotDetailCommands.enum';

export interface SliceRobotTwinsInterface {
	init: boolean;
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
	controlMode: SRTContentControlModeInterface;
	mission: SRTContentMissionInterface;
	alerts: SRTContentAlertsInterface;
	ca?: SRTContentRobotCAInterface;
	location?: SRTContentLocationInterface | undefined;
	cameras?: SRTContentCameraInterface | undefined;
	batteryState?: SRTContentBatteryStateInterface | undefined;
	dockingState?: SRTContentDockingStateInterface | undefined;
	joystickState?: SRTContentJoystickStateInterface | undefined;
	emergencyState?: SRTContentEmergencyStateInterface | undefined;
	activityState?: SRTContentActivityStateInterface | undefined;
	drawerStates?: SRTContentDrawerStatesInterface | undefined;
	safetySystems?: SRTContentSafetySystemsInterface | undefined;
	safetySensors?: SRTContentSafetySensorsInterface | undefined;
	computerInfo?: SRTContentComputerInfoInterface | undefined;
	humanPerception?: SRTContentHumanPerceptionInterface | undefined;
	transitPointStarted?: SRTContentTransitPointStartedInterface | undefined;
	plannedPath?: SRTContentPlannedPathStartedInterface | undefined;
}

export interface SRTContentSiteInterface {
	id: string;
	title?: string;
	acceptOrders?: boolean;
	acceptOrdersLastModifiedAt?: Date;
	acceptOrdersLastModifiedOrigin?: string;
	elevator?: {
		vendor?: string;
		buildingId?: string;
		deviceId?: string;
	};
}

export interface SRTContentRobotInterface {
	id: string;
	name: string;
	ceInventoryId: string;
	customerName: string;
	note: string;
	isRemoteSafetyResetRequired: boolean;
}

export interface SRTContentRobotStateInterface {
	isReady: {
		value: boolean;
		updatedAt: Date;
	};
}

export interface SRTContentControlModeInterface {
	value: RobotDetailControlModeTypeEnum;
	updatedAt: Date;
}

export interface SRTContentMissionInterface {
	value: {
		status: string;
		description: string;
	};
	updatedAt: Date;
}

export interface SRTContentAlertsInterface {
	value: IAlertInterface[];
	updatedAt: Date;
}

export interface SRTContentRobotCAInterface {
	ip: string;
	username: string;
}

export interface SRTContentLocationInterface {
	value: ILocationInterface;
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

export interface SRTContentJoystickStateInterface {
	properties: {
		isConnected: boolean;
	};
	updatedAt: Date;
}

export interface SRTContentEmergencyStateInterface {
	properties: {
		isInEmergencyState: boolean;
	};
	updatedAt: Date;
}

export interface SRTContentActivityStateInterface {
	properties: {
		latest: string;
	};
	updatedAt: Date;
}

export interface SRTContentDrawerStatesInterface {
	properties: {
		drawers: { drawer: string; isOpen: boolean }[];
	};
	updatedAt: Date;
}

export interface SRTContentSafetySystemsInterface {
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
		estopResetPermitted?: boolean;
		remoteResetPermitted?: boolean;
	};
	updatedAt: Date;
}

export interface SRTContentSafetySensorsInterface {
	properties: {
		drawers: boolean[];
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

export interface SRTContentComputerInfoInterface {
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
		distributionInfo: {
			name: string;
			version: string;
		};
	};
	updatedAt: Date;
}

export interface SRTContentHumanPerceptionInterface {
	properties: {
		legsClose: HLocationInterface[];
		legsFar: HLocationInterface[];
		legsCloseCount: number;
		legsFarCount: number;
	};
	updatedAt: Date;
}

export interface SRTContentTransitPointStartedInterface {
	properties: {
		guiVersion: string;
		protobufVersion: string;
		repositories: {
			branch: string;
			commit: string;
			name: string;
		}[];
	};
	updatedAt: Date;
}

export interface SRTContentPlannedPathStartedInterface {
	properties: {
		mapName: string;
		goal: {
			position: {
				xM: number;
				yM: number;
			};
		};
		points: {
			xM: number;
			yM: number;
		}[];
	};
	updatedAt: Date;
}

export interface IRobotTwinInterface {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	site: {
		id: string;
	};
	robot: {
		id: string;
	};
	state: {
		reported: {
			ceInventoryId: string;
			name: string;
			customerName: string;
			note: string;
			activity: string;
			robotState: {
				isReady: boolean;
			};
			isRemoteSafetyResetRequired: boolean;
			alerts: IAlertInterface[];
			ca: {
				ip: string;
				username: string;
			};
			cameras: {
				[key: string]: {
					imageId: string;
				};
			};
			status: {
				controlMode: RobotDetailControlModeTypeEnum;
				isDocked: boolean;
				isJoystickConnected: boolean;
				isInEmergencyState: boolean;
				mission: {
					status: string;
					description: string;
				};
				location: ILocationInterface;
				batteryState: {
					current: number;
					percentage: number;
					powerSupplyStatus: string;
					powerSupplyHealth: string;
					voltage: number;
				};
				drawerStates: {
					drawer: string;
					isOpen: boolean;
				}[];
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
					estopResetPermitted: boolean;
					remoteResetPermitted: boolean;
				};
				safetySensors: {
					drawers: boolean[];
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
					distributionInfo: {
						name: string;
						version: string;
					};
				};
				humanPerception: {
					legsClose: HLocationInterface[];
					legsFar: HLocationInterface[];
					legsCloseCount: number;
					legsFarCount: number;
				};
			};
			transitPointStarted: {
				guiVersion: string;
				protobufVersion: string;
				repositories: {
					branch: string;
					commit: string;
					name: string;
				}[];
			};
			plannedPath: {
				mapName: string;
				goal: {
					position: {
						xM: number;
						yM: number;
					};
				};
				points: {
					xM: number;
					yM: number;
				}[];
			};
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
			activity: {
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
				isDocked: {
					updatedAt: Date;
				};
				isJoystickConnected: {
					updatedAt: Date;
				};
				isInEmergencyState: {
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
				drawerStates: {
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
			transitPointStarted: {
				updatedAt: Date;
			};
			plannedPath: {
				updatedAt: Date;
			};
		};
	};
}

export interface IOrderQueueInterface {
	id: string;
	status: string;
}

export interface IAlertInterface {
	code: string;
	conditions: IAlertRulesConditionInterface[];
	createdAt: Date;
	level: string;
	message: string;
	notes?: string;
	updatedAt?: Date;
}

export interface IAlertRulesConditionInterface {
	field: string;
	condition: string;
	value: boolean | string | number;
	currentValue: boolean | string | number;
}

export interface ILocationInterface {
	mapName: string;
	floor: string;
	x: number;
	y: number;
	yaw: number;
}

export interface HLocationInterface {
	x: number;
	y: number;
}
