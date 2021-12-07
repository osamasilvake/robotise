export interface SliceRobotInterface {
	note: {
		loading: boolean;
	};
	maps: {
		loading: boolean;
		updating: boolean;
		content: SRContentMapsInterface | null;
	};
	map: {
		loading: boolean;
		content: SRContentMapInterface | null;
	};
	control: {
		loading: boolean;
	};
	camera: {
		loading: boolean;
	};
	auditLogs: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
	};
	battery: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
	};
	temperature: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
	};
	itemTracking: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
	};
	elevatorLogs: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
	};
	syncProducts: {
		loading: boolean;
	};
	robotConfig: {
		loading: boolean;
	};
	robotSiteConfig: {
		loading: boolean;
	};
	reports: {
		loading: boolean;
	};
}

export interface SRContentDeepLinkInterface {
	data: {
		dlink: string;
	};
}

export interface SRContentMapsInterface {
	data: SRContentMapInterface[];
	state?: SRContentMapsStateInterface;
}

export interface SRContentMapInterface {
	floor: string;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SRContentMapsStateInterface {
	pSiteId?: string;
	floor?: string;
	name?: string;
}
