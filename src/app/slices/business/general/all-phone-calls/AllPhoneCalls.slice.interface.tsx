import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceAllPhoneCallsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: APCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface APCContentInterface extends JsonAPIResponseInterface {
	data: APCDataInterface[];
	state?: APCStateInterface;
}

export interface APCDataInterface {
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
	history: APCDataHistoryInterface[];
	site: APCDataSiteInterface;
	siteRobot?: string;
}

export interface APCDataHistoryInterface {
	event: string;
	createdAt: Date;
	details?: string;
}

export interface APCDataSiteInterface {
	id: string;
}

export interface APCStateInterface {
	page?: number;
	rowsPerPage?: number;
	siteId?: string;
	includeAllCalls?: boolean;
}
