import { Dispatch, SetStateAction } from 'react';

import { ISite } from '../../../../../../../slices/business/sites/Sites.slice.interface';
import { SiteRoomsGridBlockUnblockFloorTypeEnum } from './SiteRoomsGrid.enum';

export interface SiteRoomsGridInterface {
	siteSingle: ISite;
	active: boolean;
	inactive: boolean;
	searchText: string;
}

export interface SiteRoomsGridFloorInterface {
	siteSingle: ISite;
	floor: string;
	result: SiteRoomsGridGroupAccInterface | null;
}

export interface SiteRoomsGridGroupAccInterface {
	[id: string]: string[];
}

export interface DialogGenerateQRCodeInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	roomState: { room: string };
	siteSingle: ISite;
}

export interface DialogGenerateQRCodeFormInterface {
	room: string;
	date: string;
	time: string;
}

export interface DialogToggleRoomStateInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	checkedState: { room: string; checked: boolean };
	siteSingle: ISite;
	allWhitelist: string[];
}

export interface DialogToggleFloorStateInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	floorState: {
		type: SiteRoomsGridBlockUnblockFloorTypeEnum;
		floor: string;
		rooms: string[];
	};
	siteSingle: ISite;
	allWhitelist: string[];
}
