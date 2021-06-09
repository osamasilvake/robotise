import { ISite } from '../../../../../slices/sites/Sites.slice.interface';

export interface SiteRoomsBlacklistContentInterface {
	site: ISite;
}

export interface SiteRoomsBlacklistContentGroupAccInterface {
	[id: string]: string[];
}
