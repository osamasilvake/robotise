export interface SliceRobotInterface {
	auditLogs: {
		loading: boolean;
		content: SRContentDeepLinkInterface | null;
	};
	note: {
		loading: boolean;
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

export interface SRContentMapInterface {
	floor: number;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: Date;
	updatedAt: Date;
}
