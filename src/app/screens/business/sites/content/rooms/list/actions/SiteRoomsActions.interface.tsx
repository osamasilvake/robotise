export interface SiteRoomsActionsInterface {
	active: boolean;
	inactive: boolean;
}

export interface SiteRoomsActionsFiltersPayloadInterface {
	active?: boolean;
	inactive?: boolean;
	siteId: string | undefined;
}

export interface SiteRoomsActiveRoomsInterface {
	active: boolean;
}

export interface SiteRoomsInactiveRoomsInterface {
	inactive: boolean;
}
