import { Dispatch, SetStateAction } from 'react';

export interface RobotOrdersOptionsInterface {
	activeOrders: boolean;
	setActiveOrders: Dispatch<SetStateAction<boolean>>;
	executing: boolean;
}

export interface RobotOrdersOptionActiveOrdersInterface {
	activeOrders: boolean;
	setActiveOrders: Dispatch<SetStateAction<boolean>>;
}

export interface RobotOrdersOptionNewOrderInterface {
	executing: boolean;
}
