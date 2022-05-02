import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SlicePhoneConfigsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: PCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface PCContentInterface extends JsonAPIResponseInterface {
	data: PCCDataInterface[];
	state?: PCCStateInterface;
	phoneNumbers?: {
		[key: string]: PCPhoneNumbersInterface[] | null;
	};
}

export interface PCCDataInterface {
	id: string;
	name: string;
	prefixes: string[];
	from: string;
	technician: string;
	mode: string;
	workflow: string;
	disableRoomsCallback: string[];
	callbackRetries: number;
	smsGateway: string;
	sip: { outboundPattern: string };
	roomsMapping: PCCDataRoomsMappingInterface;
	messages: PCCDataMessagesInterface;
	smsMessages: PCCDataMessagesInterface;
}

export interface PCCDataRoomsMappingInterface {
	[key: number]: string;
}

export interface PCCDataMessagesInterface {
	[key: string]: string;
}

export interface PCCStateInterface {
	pSiteId?: string;
}

export interface PCPhoneNumbersInterface {
	id: string;
	dateCreated: Date;
	dateUpdated: Date;
	friendlyName: string;
	phoneNumber: string;
	smsFallbackMethod: string;
	smsFallbackUrl: string;
	smsMethod: string;
	smsUrl: string;
	statusCallback: string;
	statusCallbackMethod: string;
	status: string;
	voiceFallbackMethod: string;
	voiceFallbackUrl: string;
	voiceMethod: string;
	voiceUrl: string;
	emergencyStatus: string;
	address: PCPhoneNumbersAddressInterface;
}

export interface PCPhoneNumbersAddressInterface {
	city: string;
	customerName: string;
	dateCreated: Date;
	dateUpdated: Date;
	friendlyName: string;
	isoCountry: string;
	postalCode: string;
	region: string;
	sid: string;
	street: string;
	emergencyEnabled: boolean;
	validated: boolean;
	verified: boolean;
}
