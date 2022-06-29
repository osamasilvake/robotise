import { Dispatch, SetStateAction } from 'react';

import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';

export interface RobotOrdersActionsInterface {
	activeOrders: boolean;
	debug: boolean;
}

export interface RobotOrdersActiveOrdersInterface {
	activeOrders: boolean;
}

export interface RobotOrdersDebugInterface {
	debug: boolean;
}

export interface DialogCreateOrderInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCreateOrderFormInterface {
	isDebug: boolean;
	location: string;
	mode: string | RobotOrderModeTypeEnum;
	type?: string;
	phone?: string;
	customerNotification?: {
		notificationTypes?: string[];
		phoneNumber?: string;
	};
}
