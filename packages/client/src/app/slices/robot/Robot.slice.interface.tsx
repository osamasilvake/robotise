import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface SliceRobotInterface {
	map: {
		loading: boolean;
		content: SRContentMapInterface | null;
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
