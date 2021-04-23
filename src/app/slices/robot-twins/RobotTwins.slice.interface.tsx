import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface SliceRobotTwinsInterface {
	loader: boolean;
	loading: boolean;
	content: SRTContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SRTContentInterface {
	data: SRTContentDataInterface[];
	dataById: SRTContentDataByIdInterface;
}

export interface SRTContentDataInterface {
	id: string;
	updatedAt: Date;
	site: SRTContentSiteInterface;
	robot: SRTContentRobotInterface;
	robotState: SRTContentRobotStateInterface;
	alerts: SRTContentAlertsInterface;
	location?: SRTContentLocationInterface | undefined;
	cameras?: SRTContentCameraInterface | undefined;
	batteryState?: SRTContentBatteryStateInterface | undefined;
	dockingState?: SRTContentDockingStateInterface | undefined;
	joystickState?: SRTContentJoystickState | undefined;
	activityState?: SRTContentActivityState | undefined;
}

export interface SRTContentDataByIdInterface {
	[id: string]: SRTContentDataInterface;
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

export interface SRTContentDockingStateInterface {
	isDocked: {
		value: boolean;
		updatedAt: Date;
	};
}

export interface SRTContentJoystickState {
	controlMode: {
		value: string;
		updatedAt: Date;
	};
}

export interface SRTContentActivityState {
	latest: {
		value: string;
		updatedAt: Date;
	};
}

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
