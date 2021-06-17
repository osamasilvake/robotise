import { ISite } from '../../../../../../../slices/sites/Sites.slice.interface';

export interface SiteRoomsGridInterface {
	siteSingle: ISite;
	active: boolean;
	inactive: boolean;
}

export interface SiteRoomsGridGroupAccInterface {
	[id: string]: string[];
}
