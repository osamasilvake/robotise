import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../../JsonApi.interface';

export interface SliceServicePositionsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SSContentServicePositionsInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SSContentServicePositionsInterface {
	data: SSContentServicePositionDataInterface[];
	meta: JsonApiMeta;
	site: { id: string };
}

export interface SSContentServicePositionDataInterface {
	id: string;
	name: string;
	location: string;
	createdAt: Date;
	updatedAt: Date;
}
