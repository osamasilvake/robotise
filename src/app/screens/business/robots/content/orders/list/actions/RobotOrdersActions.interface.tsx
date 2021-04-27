import { Dispatch, SetStateAction } from 'react';

import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';

export interface RobotOrdersActionsInterface {
	setPage: Dispatch<SetStateAction<number>>;
}

export interface RobotOrdersActiveOrdersInterface {
	setPage: Dispatch<SetStateAction<number>>;
}

export interface RobotOrdersCreateOrderInterface {
	setPage: Dispatch<SetStateAction<number>>;
}

export interface DialogCreateOrderInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setPage: Dispatch<SetStateAction<number>>;
}

export interface DialogCreateOrderPayloadInterface {
	isDebug: boolean;
	location: string;
	mode: RobotOrderModeTypeEnum;
}
