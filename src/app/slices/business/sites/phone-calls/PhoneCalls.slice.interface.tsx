import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiResponseInterface } from '../../../JsonApi.interface';

export interface SlicePhoneCallsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: PCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface PCContentInterface extends JsonApiResponseInterface {
	data: PCCDataInterface[];
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
}

export interface PCCDataHistoryInterface {
	event: string;
	createdAt: Date;
	details?: string;
}

export interface PCCStateInterface {
	pSiteId?: string;
	page?: number;
	rowsPerPage?: number;
}
