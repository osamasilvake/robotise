import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SliceProductsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SPContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SPContentInterface extends JsonAPIResponseInterface {
	data: SPCDataInterface[];
	state?: SPCStateInterface;
}

export interface SPCDataInterface {
	site: SPCSiteInterface;
	id: string;
	image: string;
	name: string;
	length: number;
	weight: number;
	volume: string;
	price: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface SPCSiteInterface {
	id: string;
}

export interface SPCStateInterface {
	pSiteId?: string;
}
