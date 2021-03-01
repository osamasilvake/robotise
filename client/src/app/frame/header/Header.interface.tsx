import { Dispatch, SetStateAction } from 'react';

export interface HeaderInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
