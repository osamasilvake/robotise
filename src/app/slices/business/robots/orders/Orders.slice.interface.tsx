import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceOrdersInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SOContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SOContentInterface extends JsonAPIResponseInterface {
	data: SOCDataInterface[];
	state?: SOCStateInterface;
}

export interface SOCDataInterface {
	id: string;
	location: string;
	locationId: string;
	locationName: string;
	mode: string;
	status: string;
	origin: string;
	isDebug: boolean;
	updatedAt: Date;
	createdAt: Date;
	history: SOCDataHistoryInterface[];
	orderReport: SOCDataOrderReportInterface;
	site: SOCDataSiteInterface;
	robot: SOCDataRobotInterface;
}

export interface SOCStateInterface {
	pRobotId?: string;
	page?: number;
	rowsPerPage?: number;
	activeOrders?: boolean;
	debug?: boolean;
	marketingRides?: boolean;
	coldCalls?: boolean;
}

export interface SOCDataHistoryInterface {
	event: string;
	details: string;
	createdAt: Date;
	elapsedTime?: string;
	aggregatedTime?: string;
}

export interface SOCDataOrderReportInterface {
	id: string;
}

export interface SOCDataSiteInterface {
	id: string;
}

export interface SOCDataRobotInterface {
	id: string;
}
