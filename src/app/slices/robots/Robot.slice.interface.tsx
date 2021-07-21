export interface SliceRobotInterface {
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
}

export interface SRContentMapInterface {
	floor: number;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: string;
	updatedAt: string;
}
