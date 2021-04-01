import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface RTSInterface {
	loader: boolean;
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
	alerts: RTSAlertInterface;
	location?: RTSLocationInterface | undefined;
	cameras?: RTSCameraInterface | undefined;
	batteryState?: RTSBatteryStateInterface | undefined;
	dockingState?: RTSDockingStateInterface | undefined;
	joystickState?: RTSJoystickState | undefined;
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

export interface RTSAlertInterface {
	value: IAlert[];
	updatedAt: Date;
}

export interface RTSLocationInterface {
	value: ILocation;
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

export interface RTSJoystickState {
	controlMode: {
		value: string;
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
			robotState: {
				isReady: boolean;
			};
			alerts: IAlert[];
			cameras: {
				[key: string]: {
					imageId: string;
				};
			};
			batteryState: {
				percentage: number;
				powerSupplyStatus: string;
				powerSupplyHealth: string;
				current: number;
				voltage: number;
			};
			dockingState: {
				isDocked: boolean;
			};
			joystickState: {
				controlMode: string;
			};
			activity: string;
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
			dockingState: {
				isDocked: {
					updatedAt: Date;
				};
			};
			joystickState: {
				controlMode: {
					updatedAt: Date;
				};
			};
			activity: {
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
			lastBootup: { updatedAt: Date };
			lastShutdown: { updatedAt: Date };
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
	map: {
		id: string;
		floor: string;
	};
	point: {
		x: number;
		y: number;
		yaw: number;
	};
}
