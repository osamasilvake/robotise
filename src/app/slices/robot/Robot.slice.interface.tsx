import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface SliceRobotInterface {
	map: {
		loading: boolean;
		content: SRContentMapInterface | null;
		errors: TriggerMessageInterface | null;
	};
	camera: {
		loading: boolean;
		content: SRContentCameraImageInterface | null;
		errors: TriggerMessageInterface | null;
	};
}

export interface SRContentMapInterface {
	createdAt: string;
	floor: number;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	updatedAt: string;
}

export interface SRContentCameraImageInterface {
	id: string;
	status: string;
	command: string;
	updatedAt: string;
	createdAt: string;
	options: {
		camera: string;
	};
	history: {
		status: string;
		createdAt: string;
	}[];
}
