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
	data: CCContentDataInterface[];
	state?: CCContentStateInterface;
}

export interface CCContentDataInterface {
	id: string;
	locations: CCContentDataLocationsInterface[];
	createdAt: Date;
	updatedAt: Date;
}

export interface CCContentDataLocationsInterface {
	locationId: string;
	priority: number;
	lastExecuted: string;
}

export interface CCContentStateInterface {
	pSiteId?: string;
}
