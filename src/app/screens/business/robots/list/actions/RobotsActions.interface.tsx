import { Dispatch, SetStateAction } from 'react';

export interface RobotsActionsInterface {
	hideCreateBtn?: boolean;
}

export interface DialogCreateRobotInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCreateRobotFormInterface {
	siteId: string;
	name: string;
	customerName: string;
	ceInventoryId: string;
}
