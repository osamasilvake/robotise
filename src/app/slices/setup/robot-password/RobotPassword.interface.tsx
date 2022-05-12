import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';

export interface SliceRobotPasswordInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SRPContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SRPContentInterface {
	data: {
		type: string;
		attributes: {
			password: string;
		};
	};
}
