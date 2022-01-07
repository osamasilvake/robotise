export interface SliceRobotOperationsInterface {
	note: {
		loading: boolean;
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

export interface SROContentMapInterface {
	floor: string;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: Date;
	updatedAt: Date;
}
