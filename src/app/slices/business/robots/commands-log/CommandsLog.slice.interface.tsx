import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../../JsonApi.interface';

export interface SliceCommandsLogInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: CLContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface CLContentInterface {
	data: CLCDataInterface[];
	meta: JsonApiMeta;
	state?: CLCStateInterface;
}

export interface CLCDataInterface {
	id: string;
	command: string;
	status: string;
	updatedAt: Date;
	createdAt: Date;
	history: CLCDataHistoryInterface[];
}

export interface CLCDataHistoryInterface {
	status: string;
	createdAt: Date;
	details?: string;
}

export interface CLCStateInterface {
	pRobotId?: string;
	page?: number;
	rowsPerPage?: number;
}
