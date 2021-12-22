import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceCommandsLogInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: CLContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface CLContentInterface extends JsonAPIResponseInterface {
	data: CLCDataInterface[];
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
