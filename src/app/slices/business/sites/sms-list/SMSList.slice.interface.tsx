import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceSMSListInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SLContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SLContentInterface extends JsonAPIResponseInterface {
	data: SLCDataInterface[];
	state?: SLCStateInterface;
}

export interface SLCDataInterface {
	id: string;
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
	history: SLCDataHistoryInterface[];
}

export interface SLCDataHistoryInterface {
	event: string;
	createdAt: Date;
	details: string;
}

export interface SLCStateInterface {
	pSiteId?: string;
	page?: number;
	rowsPerPage?: number;
}
