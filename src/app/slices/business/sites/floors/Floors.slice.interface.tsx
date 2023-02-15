import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';

export interface SliceFloorsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	content: SFContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SFContentInterface {
	data: SFCDataInterface[];
	state?: SFCStateInterface;
}

export interface SFCDataInterface {
	id: string;
	name: string;
	desc: string;
	order: number;
	altitude: number;
	site: string;
}

export interface SFCStateInterface {
	pSiteId?: string;
}
