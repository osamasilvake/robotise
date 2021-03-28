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
	type: string;
	attributes: {
		command: string;
		status: string;
		options: {
			camera: string;
		};
		updatedAt: Date;
		createdAt: Date;
	};
}
