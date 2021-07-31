import { ISite } from '../../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteRoomsGridInterface {
	siteSingle: ISite;
	active: boolean;
	inactive: boolean;
}

export interface SiteRoomsGridGroupAccInterface {
	[id: string]: string[];
}
