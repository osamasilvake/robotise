import { Dispatch, SetStateAction } from 'react';

export interface SiteRoomsActionsInterface {
	active: boolean;
	inactive: boolean;
	searchText: string;
}

export interface SiteRoomsActiveRoomsInterface {
	active: boolean;
}

export interface SiteRoomsInactiveRoomsInterface {
	inactive: boolean;
}

export interface SiteRoomsSearchRoomsInterface {
	active: boolean;
	inactive: boolean;
	searchText: string;
}

export interface DialogModifyRoomsInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogModifyRoomsFormInterface {
	whitelist: string | string[];
	blocked?: string | string[];
	available?: string[];
}
