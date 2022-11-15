import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceAllElevatorCallsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: AECContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface AECContentInterface extends JsonAPIResponseInterface {
	data: AECDataInterface[];
	state?: AECStateInterface;
}

export interface AECDataInterface {
	id: string;
	buildingId: string;
	status: string;
	e2eStatus: string;
	vendor: string;
	callType: string;
	srcAreaId: string;
	dstAreaId: string;
	traceId: string;
	isDebug: boolean;
	updatedAt: Date;
	createdAt: Date;
	history: AECDataHistoryInterface[];
	site: AECDataSiteInterface;
	robot: AECDataRobotInterface;
	siteRobot: string;
}

export interface AECDataHistoryInterface {
	event: string;
	createdAt: Date;
	details?: string;
}

export interface AECDataSiteInterface {
	id: string;
}

export interface AECDataRobotInterface {
	id: string;
}

export interface AECStateInterface {
	page?: number;
	rowsPerPage?: number;
	siteId?: string;
	includeAllCalls?: boolean;
}
