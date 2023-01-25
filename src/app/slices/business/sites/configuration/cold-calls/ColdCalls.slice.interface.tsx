import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../../JsonAPI.interface';

export interface SliceColdCallsInterface {
	init: boolean;
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: CCContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface CCContentInterface extends JsonAPIResponseInterface {
	data: CCContentDataInterface;
	state?: CCContentStateInterface;
}

export interface CCContentDataInterface {
	enabled: boolean;
	schedule: {
		startTimeLocal: string;
		endTimeLocal: string;
		days: string[];
	};
}

export interface CCContentStateInterface {
	pSiteId?: string;
}
