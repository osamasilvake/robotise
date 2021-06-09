import { ISite } from '../../../../../slices/sites/Sites.slice.interface';

export interface SiteRoomsBlacklistContentInterface {
	siteSingle: ISite;
}

export interface SiteRoomsBlacklistContentGroupAccInterface {
	[id: string]: string[];
}
