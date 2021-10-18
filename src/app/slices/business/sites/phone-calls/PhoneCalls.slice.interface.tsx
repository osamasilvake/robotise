import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../../JsonApi.interface';

export interface SlicePhoneCallsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: PCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface PCContentInterface {
	data: PCCDataInterface[];
	meta: JsonApiMeta;
	state?: PCCStateInterface;
}

export interface PCCDataInterface {
	room: string;
	mode: string;
	vendor: string;
	workflow: string;
	status: string;
	from: string;
	callerCountry: string;
	updatedAt: Date;
	createdAt: Date;
	history: PCCDataHistoryInterface[];
	notes?: PCCDataNotesInterface;
}

export interface PCCDataHistoryInterface {
	event: string;
	createdAt: Date;
	details?: string;
}

export interface PCCDataNotesInterface {
	workflow: string;
}

export interface PCCStateInterface {
	pSiteId?: string;
	page?: number;
	rowsPerPage?: number;
}
