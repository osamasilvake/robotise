export interface SliceRobotInterface {
	note: {
		loading: boolean;
	};
	auditLogs: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
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
	syncProducts: {
		loading: boolean;
	};
	robotConfig: {
		loading: boolean;
	};
	robotSiteConfig: {
		loading: boolean;
	};
	itemTracking: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
	};
	elevatorLogs: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
	};
	reports: {
		loading: boolean;
	};
}

export interface SRContentMapInterface {
	floor: number;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SRContentDeepLinkInterface {
	data: {
		dlink: string;
	};
}
