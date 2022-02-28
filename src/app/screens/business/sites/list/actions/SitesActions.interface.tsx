import { Dispatch, SetStateAction } from 'react';

export interface DialogCreateSiteInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCreateSiteFormInterface {
	title: string;
	timezone: string;
	currency: string;
}
