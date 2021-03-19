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
	robot: {
		id: string;
		name: string;
	};
	site: {
		id: string;
		title: string;
	};
	robotState: {
		isReady: {
			value: boolean;
			updatedAt: Date;
		};
	};
	alerts: {
		value: IAlert[];
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
	last_error_code: string;
	commanded_velocity: number;
	controller_temperature: number;
	controller_voltage: number;
	position: number;
	velocity: number;
	motor_current: number;
}

export interface MetadataMotorStatus {
	status: {
		updatedAt: Date;
	};
	last_error_code: {
		updatedAt: Date;
	};
	commanded_velocity: {
		updatedAt: Date;
	};
	controller_temperature: {
		updatedAt: Date;
	};
	controller_voltage: {
		updatedAt: Date;
	};
	position: {
		updatedAt: Date;
	};
	velocity: {
		updatedAt: Date;
	};
	motor_current: {
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
