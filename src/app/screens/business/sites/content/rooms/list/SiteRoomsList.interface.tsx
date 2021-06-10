import { ISite } from '../../../../../../slices/sites/Sites.slice.interface';

export interface SiteRoomsListInterface {
	siteSingle: ISite;
}

export interface SiteRoomsListGroupAccInterface {
	[id: string]: string[];
}
