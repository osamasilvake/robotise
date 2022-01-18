import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceElevatorCallsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: ECContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface ECContentInterface extends JsonAPIResponseInterface {
	data: ECCDataInterface[];
	state?: ECCStateInterface;
}

export interface ECCDataInterface {
	id: string;
	buildingId: string;
	status: string;
	vendor: string;
	callType: string;
	srcAreaId: string;
	dstAreaId: string;
	traceId: string;
	updatedAt: Date;
	createdAt: Date;
	history: ECCDataHistoryInterface[];
}

export interface ECCDataHistoryInterface {
	event: string;
	createdAt: Date;
	details?: string;
}

export interface ECCStateInterface {
	pRobotId?: string;
	page?: number;
	rowsPerPage?: number;
}
