import { Dispatch, SetStateAction } from 'react';

export interface DialogCreateRobotInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCreateRobotFormInterface {
	siteId: string;
	name: string;
	customerName: string;
}
