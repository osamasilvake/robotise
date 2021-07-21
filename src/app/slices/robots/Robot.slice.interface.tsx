export interface SliceRobotInterface {
	map: {
		loading: boolean;
		content: SRContentMapInterface | null;
	};
	control: {
		loading: boolean;
		content: SRContentControlInterface | null;
	};
	camera: {
		loading: boolean;
		content: SRContentCameraImageInterface | null;
	};
	syncProducts: {
		loading: boolean;
		content: SRContentSyncProductsInterface | null;
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

export interface SRContentControlInterface {
	id: string;
	command: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	history: {
		status: string;
		createdAt: string;
	}[];
}

export interface SRContentCameraImageInterface {
	id: string;
	status: string;
	command: string;
	createdAt: string;
	updatedAt: string;
	options: {
		camera: string;
	};
	history: {
		status: string;
		createdAt: string;
	}[];
}

export interface SRContentSyncProductsInterface {
	id: string;
	commandName: string;
}
