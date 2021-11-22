import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SlicePhoneConfigsInterface {
	loader: boolean;
	loading: boolean;
	content: PCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface PCContentInterface extends JsonAPIResponseInterface {
	data: PCCDataInterface[];
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

export interface PCCStateInterface {
	pSiteId?: string;
}
