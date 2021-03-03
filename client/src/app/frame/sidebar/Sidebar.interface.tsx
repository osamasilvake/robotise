import { Dispatch, SetStateAction } from 'react';

export interface SidebarInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface sidebarListInterface {
	id: number;
	icon: string;
	label: string;
	path: string;
	newLine?: boolean;
}
