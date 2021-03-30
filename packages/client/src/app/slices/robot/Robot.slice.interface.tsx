import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface RobotSliceInterface {
	cameras: {
		base: {
			loading: boolean;
			content: RSCameraInterface | null;
			errors: TriggerMessageInterface | null;
		};
		top: {
			loading: boolean;
			content: RSCameraInterface | null;
			errors: TriggerMessageInterface | null;
		};
	};
}

export interface RSCameraInterface {
	id: string;
	command: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	user: RSCameraUserInterface;
	robot: RSCameraRobotInterface;
	options: RSCameraOptionsInterface;
}

export interface RSCameraUserInterface {
	id: string;
}

export interface RSCameraRobotInterface {
	id: string;
}

export interface RSCameraOptionsInterface {
	camera: string;
}
