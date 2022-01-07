export interface SliceRobotOperationsInterface {
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
		content: SROContentMapInterface | null;
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
	reports: {
		loading: boolean;
	};
}

export interface SRContentMapsInterface {
	data: SROContentMapInterface[];
	state?: SROContentMapsStateInterface;
}

export interface SROContentMapInterface {
	floor: string;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SROContentMapsStateInterface {
	pSiteId?: string;
	floor?: string;
	name?: string;
}
