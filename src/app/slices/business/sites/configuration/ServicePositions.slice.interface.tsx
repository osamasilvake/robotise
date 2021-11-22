import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceServicePositionsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SSContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SSContentInterface extends JsonAPIResponseInterface {
	data: SSCDataInterface[];
	site: { id: string };
}

export interface SSCDataInterface {
	id: string;
	name: string;
	location: string;
	createdAt: Date;
	updatedAt: Date;
}
