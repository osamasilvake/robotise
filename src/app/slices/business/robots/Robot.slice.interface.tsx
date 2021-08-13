export interface SliceRobotInterface {
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

export interface SRContentMapInterface {
	floor: number;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: Date;
	updatedAt: Date;
}
