import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceAllPhoneCallsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: APCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface APCContentInterface extends JsonAPIResponseInterface {
	data: APCDataInterface[];
	state?: APCStateInterface;
}

export interface APCDataInterface {
	type: string;
	room: string;
	vendor: string;
	workflow: string;
	status: string;
	from: string;
	to: string;
	callerCountry: string;
	isDebug: boolean;
	updatedAt: Date;
	createdAt: Date;
	history: APCDataHistoryInterface[];
}

export interface APCDataHistoryInterface {
	event: string;
	createdAt: Date;
	details?: string;
}

export interface APCStateInterface {
	siteId?: string;
	page?: number;
	rowsPerPage?: number;
}
