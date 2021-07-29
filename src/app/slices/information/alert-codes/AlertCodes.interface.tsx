import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../JsonApi.interface';

export interface SliceAlertCodesInterface {
	loader: boolean;
	loading: boolean;
	content: SACContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SACContentInterface {
	data: SACDataInterface[];
	meta: JsonApiMeta;
	state?: SACStateInterface;
}

export interface SACContentDataByIdInterface {
	[id: string]: SACDataInterface;
}

export interface SACDataInterface {
	id: string;
	alertCode: string;
	code: number;
	description: string;
	destinations: {
		target: string;
	}[];
	node: string;
	status: string;
	system: string;
	level: string;
	createdAt: string;
	updatedAt: string;
}

export interface SACStateInterface {
	page?: number;
	rowsPerPage?: number;
}
