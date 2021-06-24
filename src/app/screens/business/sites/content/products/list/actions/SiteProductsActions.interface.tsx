import { Dispatch, SetStateAction } from 'react';

export interface DialogCreateProductInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
