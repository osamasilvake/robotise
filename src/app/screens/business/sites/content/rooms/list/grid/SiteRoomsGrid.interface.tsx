import { Dispatch, SetStateAction } from 'react';

import { SRContentDataInterface } from '../../../../../../../slices/business/sites/rooms/Rooms.slice.interface';
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
	result: SiteRoomsGridGroupAccInterface;
}

export interface SiteRoomsGridGroupAccInterface {
	[id: string]: SRContentDataInterface[];
}

export interface DialogToggleRoomStateInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	checkedState: { id: string; room: string; checked: boolean };
	siteSingle: ISite;
	allRooms: SRContentDataInterface[];
}

export interface DialogToggleFloorStateInterface {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	floorState: {
		type: SiteRoomsGridBlockUnblockFloorTypeEnum;
		floor: string;
		rooms: SiteRoomsGridGroupAccInterface;
	};
	siteSingle: ISite;
}
