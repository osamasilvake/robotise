import { TriggerMessageInterface } from '../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../JsonAPI.interface';

export interface SliceAlertCodesInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SACContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SACContentInterface extends JsonAPIResponseInterface {
	data: SACDataInterface[];
	state?: SACStateInterface;
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
	createdAt: Date;
	updatedAt: Date;
}

export interface SACStateInterface {
	page?: number;
	rowsPerPage?: number;
}
