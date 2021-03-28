import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface RTSInterface {
	loading: boolean;
	content: RTSContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface RTSContentInterface {
	data: RTSMappedResponseDataInterface[];
	dataById: RTSDataByIdInterface;
}

export interface RTSDataByIdInterface {
	[id: string]: RTSMappedResponseDataInterface;
}

// mapped response data
export interface RTSMappedResponseDataInterface {
	id: string;
	updatedAt: Date;
	robot: RTSRobotInterface;
	site: RTSSiteInterface;
	robotState: RTSRobotStateInterface;
	alerts: RTSRobotAlertInterface;
	cameras: RTSCameraInterface | undefined;
	batteryState?: RTSBatteryStateInterface | undefined;
	dockingState?: RTSDockingStateInterface | undefined;
	emergencyBrakeState: RTSEmergencyStateInterface | undefined;
	motorLeftWheelState?: RTSMotorWheelState | undefined;
	motorRightWheelState?: RTSMotorWheelState | undefined;
	joystickState?: RTSJoystickState | undefined;
	lidarState?: RTSLidarState | undefined;
	realsenseState?: RTSRealsenseState | undefined;
	activityState?: RTSActivityState | undefined;
}

export interface RTSRobotInterface {
	id: string;
	name: string;
}

export interface RTSSiteInterface {
	id: string;
	title?: string;
	acceptOrders?: boolean;
	elevator?: {
		vendor?: string;
		buildingId?: string;
		deviceId?: string;
	};
}

export interface RTSRobotStateInterface {
	isReady: {
		value: boolean;
		updatedAt: Date;
	};
}

export interface RTSRobotAlertInterface {
	value: IAlert[];
	updatedAt: Date;
}

export interface RTSCameraInterface {
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

export interface RTSBatteryStateInterface {
	current: {
		value: number;
		updatedAt: Date;
	};
	percentage: {
		value: number;
		updatedAt: Date;
	};
	powerSupplyStatus: {
		value: string;
		updatedAt: Date;
	};
	powerSupplyHealth: {
		value: string;
		updatedAt: Date;
	};
	voltage: {
		value: number;
		updatedAt: Date;
	};
}

export interface RTSDockingStateInterface {
	isDocked: {
		value: boolean;
		updatedAt: Date;
	};
}

export interface RTSEmergencyStateInterface {
	votedYes: {
		value: string;
		updatedAt: Date;
	};
}

export interface RTSMotorWheelState {
	id?: string;
	status: {
		value: string;
		updatedAt: Date;
	};
	motorCurrent: {
		value: number;
		updatedAt: Date;
	};
	commandedVelocity: {
		value: number;
		updatedAt: Date;
	};
	controllerTemperature: {
		value: number;
		updatedAt: Date;
	};
	controllerVoltage: {
		value: number;
		updatedAt: Date;
	};
	position: {
		value: number;
		updatedAt: Date;
	};
	velocity: {
		value: number;
		updatedAt: Date;
	};
	lastErrorCode: {
		value: string;
		updatedAt: Date;
	};
}

export interface RTSJoystickState {
	controlMode: {
		value: string;
		updatedAt: Date;
	};
}

export interface RTSLidarState {
	receivingScans: {
		value: boolean;
		updatedAt: Date;
	};
}

export interface RTSRealsenseState {
	receivingData: {
		value: boolean;
		updatedAt: Date;
	};
	processingData: {
		value: boolean;
		updatedAt: Date;
	};
}

export interface RTSActivityState {
	latest: {
		value: string;
		updatedAt: Date;
	};
}

// initial
export interface IRobotTwin {
	id: string;
	robot: {
		id: string;
	};
	site: {
		id: string;
	};
	createdAt: Date;
	updatedAt: Date;
	state: {
		reported: {
			name: string;
			customerName: string;
			batteryState: {
				percentage: number;
				powerSupplyStatus: string;
				powerSupplyHealth: string;
				current: number;
				voltage: number;
			};
			motorRightWheelState: StateMotorStatus;
			motorLeftWheelState: StateMotorStatus;
			dockingState: {
				isDocked: boolean;
			};
			emergencyBrakeState: {
				votedYes: string;
			};
			joystickState: {
				controlMode: string;
			};
			lidarState: {
				receivingScans: boolean;
			};
			cameras: {
				[key: string]: {
					imageId: string;
				};
			};
			drawerStates: {
				[key: string]: {
					drawerType: string;
					drawerId: string;
					commandType: string;
					isClosed: boolean;
				};
			};
			realsenseState: {
				receivingData: boolean;
				processingData: boolean;
			};
			activity: string;
			robotState: {
				isReady: boolean;
			};
			alerts: IAlert[];
			location: {
				map: {
					id: string;
					floor: string;
				};
				point: {
					x: number;
					y: number;
					yaw: number;
				};
			};
			orders: {
				queue: IOrderQueue[];
				size: number;
			};
			inventory: {
				status: string;
			};
			muteSensorState: string;
			emergencyStopState: {
				isTriggered: boolean;
			};
			lastBootup: Date;
			lastShutdown: Date;
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
			batteryState: {
				percentage: {
					updatedAt: Date;
				};
				powerSupplyStatus: {
					updatedAt: Date;
				};
				powerSupplyHealth: {
					updatedAt: Date;
				};
				current: {
					updatedAt: Date;
				};
				voltage: {
					updatedAt: Date;
				};
			};
			motorRightWheelState: MetadataMotorStatus;
			motorLeftWheelState: MetadataMotorStatus;
			dockingState: {
				isDocked: {
					updatedAt: Date;
				};
			};
			emergencyBrakeState: {
				votedYes: {
					updatedAt: Date;
				};
			};
			joystickState: {
				controlMode: {
					updatedAt: Date;
				};
			};
			lidarState: {
				receivingScans: {
					updatedAt: Date;
				};
			};
			cameras: {
				[key: string]: {
					imageId: {
						updatedAt: Date;
					};
				};
			};
			drawerStates: {
				[key: string]: {
					drawerType: {
						updatedAt: Date;
					};
					drawerId: {
						updatedAt: Date;
					};
					commandType: {
						updatedAt: Date;
					};
					isClosed: {
						updatedAt: Date;
					};
				};
			};
			realsenseState: {
				receivingData: {
					updatedAt: Date;
				};
				processingData: {
					updatedAt: Date;
				};
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
			location: {
				updatedAt: Date;
			};
			orders: {
				updatedAt: Date;
			};
			inventory: {
				status: { updatedAt: Date };
			};
			muteSensorState: { updatedAt: Date };
			emergencyStopState: {
				isTriggered: { updatedAt: Date };
			};
			lastBootup: { updatedAt: Date };
			lastShutdown: { updatedAt: Date };
		};
	};
}

export interface StateMotorStatus {
	id: string;
	status: string;
	motorCurrent: number;
	commandedVelocity: number;
	controllerTemperature: number;
	controllerVoltage: number;
	position: number;
	velocity: number;
	lastErrorCode: string;
}

export interface MetadataMotorStatus {
	status: {
		updatedAt: Date;
	};
	motorCurrent: {
		updatedAt: Date;
	};
	commandedVelocity: {
		updatedAt: Date;
	};
	controllerTemperature: {
		updatedAt: Date;
	};
	controllerVoltage: {
		updatedAt: Date;
	};
	position: {
		updatedAt: Date;
	};
	velocity: {
		updatedAt: Date;
	};
	lastErrorCode: {
		updatedAt: Date;
	};
}

export interface IAlertRulesCondition {
	field: string;
	condition: string;
	value: boolean | string | number;
	currentValue: boolean | string | number;
}

export interface IAlert {
	code: string;
	message: string;
	level: string;
	createdAt: Date;
	updatedAt?: Date;
	notes?: string;

	id: string;
	origin: string;

	field: string;
	conditions: IAlertRulesCondition[];
}

export interface IOrderQueue {
	id: string;
	status: string;
}
