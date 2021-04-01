import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';

export interface RSInterface {
	map: {
		loading: boolean;
		content: RSContentMapInterface | null;
		errors: TriggerMessageInterface | null;
	};
}

export interface RSContentMapInterface {
	createdAt: string;
	floor: number;
	imagePath: string;
	name: string;
	origin: number[];
	resolution: number;
	updatedAt: string;
}
