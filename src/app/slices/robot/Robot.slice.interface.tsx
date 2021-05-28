import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface SliceRobotInterface {
	map: {
		loading: boolean;
		content: SRContentMapInterface | null;
		errors: TriggerMessageInterface | null;
	};
	control: {
		loading: boolean;
		content: SRContentControlInterface | null;
		errors: TriggerMessageInterface | null;
	};
	camera: {
		loading: boolean;
		content: SRContentCameraImageInterface | null;
		errors: TriggerMessageInterface | null;
	};
	syncProducts: {
		loading: boolean;
		content: SRContentCameraImageInterface | null;
		errors: TriggerMessageInterface | null;
	};
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

export interface SRContentMapInterface {
	floor: number;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	createdAt: string;
	updatedAt: string;
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
