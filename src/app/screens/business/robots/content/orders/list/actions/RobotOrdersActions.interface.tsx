import { Dispatch, SetStateAction } from 'react';

import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';

export interface RobotOrdersActionsInterface {
	activeOrders: boolean;
	debug: boolean;
	topSpace?: boolean;
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

export interface DialogCreateOrderPayloadInterface {
	isDebug: boolean;
	location: string;
	mode: RobotOrderModeTypeEnum;
}
