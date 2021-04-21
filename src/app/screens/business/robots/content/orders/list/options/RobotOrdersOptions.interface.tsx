import { Dispatch, SetStateAction } from 'react';

export interface RobotOrdersOptionsInterface {
	activeOrders: boolean;
	setActiveOrders: Dispatch<SetStateAction<boolean>>;
	setPage: Dispatch<SetStateAction<number>>;
	executing: boolean;
}

export interface RobotOrdersOptionActiveOrdersInterface {
	activeOrders: boolean;
	setActiveOrders: Dispatch<SetStateAction<boolean>>;
	setPage: Dispatch<SetStateAction<number>>;
}

export interface RobotOrdersOptionNewOrderInterface {
	executing: boolean;
}

export interface DialogNewOrderOrderInterface {
	executing: boolean;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
