import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceAllSMSListInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: ASLContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface ASLContentInterface extends JsonAPIResponseInterface {
	data: ASLDataInterface[];
	state?: ASLStateInterface;
}

export interface ASLDataInterface {
	type: string;
	room: string;
	locationName: string;
	vendor: string;
	workflow: string;
	status: string;
	from: string;
	to: string;
	callerCountry: string;
	isDebug: boolean;
	updatedAt: Date;
	createdAt: Date;
	history: ASLDataHistoryInterface[];
	site: ASLDataSiteInterface;
	siteRobot?: string;
}

export interface ASLDataHistoryInterface {
	event: string;
	createdAt: Date;
	details: string;
}

export interface ASLDataSiteInterface {
	id: string;
}

export interface ASLStateInterface {
	page?: number;
	rowsPerPage?: number;
	siteId?: string;
	includeAllCalls?: boolean;
}
