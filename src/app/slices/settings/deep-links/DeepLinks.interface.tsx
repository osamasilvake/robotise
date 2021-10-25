import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { JsonApiResponse } from '../../JsonApi.interface';

export interface SliceDeepLinksInterface {
	loader: boolean;
	loading: boolean;
	content: SDLContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SDLContentInterface extends JsonApiResponse {
	data: SDLDataInterface[];
	state?: SDLStateInterface;
}

export interface SDLDataInterface {
	key: string;
	name: string;
	description: string;
	link: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface SDLStateInterface {
	page?: number;
	rowsPerPage?: number;
}
