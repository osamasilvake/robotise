import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../../JsonApi.interface';

export interface SliceLogsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SLContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SLContentInterface {
	data: SLCDataInterface[];
	meta: JsonApiMeta;
	state?: SLCStateInterface;
}

export interface SLCDataInterface {
	id: string;
	command: string;
	status: string;
	updatedAt: Date;
	createdAt: Date;
	history: SLCDataHistoryInterface[];
}

export interface SLCDataHistoryInterface {
	status: string;
	createdAt: Date;
	details?: string;
}

export interface SLCStateInterface {
	pRobotId?: string;
	page?: number;
	rowsPerPage?: number;
}
