import { Dispatch, SetStateAction } from 'react';

export interface DialogTestCallConfirmationInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	halt: boolean;
	setHalt: Dispatch<SetStateAction<boolean>>;
}
