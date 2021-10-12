import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../../JsonApi.interface';

export interface SlicePhoneConfigsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: PCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface PCContentInterface {
	data: PCCDataInterface[];
	meta: JsonApiMeta;
	state?: PCCStateInterface;
}

export interface PCCDataInterface {
	name: string;
	prefixes: string[];
	from: string;
	technician: string;
	mode: string;
	workflow: string;
	disableRoomsCallback: string[];
	messages: PCCDataMessagesInterface;
}

export interface PCCDataMessagesInterface {
	welcome: string;
	confirmed: string;
	welcomeNoConfirmation: string;
	orderAtTargetPosition: string;
	rejectHoliday: string;
	rejectOutOfWorkingTime: string;
	rejectRoomNotServed: string;
	rejectGeneric: string;
}

export interface PCCStateInterface {
	pSiteId?: string;
	page?: number;
	rowsPerPage?: number;
}
