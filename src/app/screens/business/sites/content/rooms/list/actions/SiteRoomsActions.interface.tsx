import { Dispatch, SetStateAction } from 'react';

export interface SiteRoomsActionsInterface {
	active: boolean;
	inactive: boolean;
}

export interface SiteRoomsActiveRoomsInterface {
	active: boolean;
}

export interface SiteRoomsInactiveRoomsInterface {
	inactive: boolean;
}

export interface DialogModifyRoomsInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
