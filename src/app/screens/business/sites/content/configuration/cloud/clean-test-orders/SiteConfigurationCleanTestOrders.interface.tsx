import { Dispatch, SetStateAction } from 'react';

export interface DialogCleanTestOrdersInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCleanTestOrdersFormInterface {
	dateTo: string;
	timeTo: string;
}
