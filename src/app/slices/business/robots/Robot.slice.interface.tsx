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
