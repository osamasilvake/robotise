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
}

export interface PCCDataInterface {
	name: string;
	prefixes: string[];
	from: string;
	technician: string;
	mode: string;
	workflow: string;
	disableRoomsCallback: string[];
	roomsMapping: PCCDataRoomsMappingInterface;
	messages: PCCDataMessagesInterface;
}

export interface PCCDataRoomsMappingInterface {
	[key: number]: string;
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
