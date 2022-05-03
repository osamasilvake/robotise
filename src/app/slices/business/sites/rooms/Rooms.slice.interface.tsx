export interface SliceRoomsInterface {
	updating: boolean;
	content: SRContentInterface | null;
}

export interface SRContentInterface {
	state?: SRCStateInterface;
}

export interface SRCStateInterface {
	active: boolean;
	inactive: boolean;
	searchText: string;
	pSiteId?: string;
}
