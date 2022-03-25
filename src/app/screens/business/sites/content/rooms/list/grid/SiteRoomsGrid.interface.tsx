import { Dispatch, SetStateAction } from 'react';

import { ISite } from '../../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteRoomsGridInterface {
	siteSingle: ISite;
	active: boolean;
	inactive: boolean;
}

export interface SiteRoomsGridGroupAccInterface {
	[id: string]: string[];
}

export interface DialogToggleRoomStateInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	checkedState: { room: string; checked: boolean };
	siteSingle: ISite;
	allWhitelist: string[];
}
