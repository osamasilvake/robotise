import { ISite } from '../../../../../../../slices/sites/Sites.slice.interface';

export interface SiteRoomsListGridInterface {
	siteSingle: ISite;
	active: boolean;
	inactive: boolean;
}

export interface SiteRoomsListGridGroupAccInterface {
	[id: string]: string[];
}
