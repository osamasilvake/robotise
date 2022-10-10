import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SlicePhoneCallsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: PCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface PCContentInterface extends JsonAPIResponseInterface {
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
	isDebug: boolean;
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
