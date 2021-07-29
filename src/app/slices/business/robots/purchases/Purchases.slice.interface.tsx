import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiMeta } from '../../../JsonApi.interface';

export interface SlicePurchasesInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SPContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SPContentInterface {
	data: SPCDataInterface[];
	meta: JsonApiMeta;
	state?: SPCStateInterface;
}

export interface SPCDataInterface {
	id: string;
	comment: string;
	currency: string;
	isBilled: boolean;
	isDebug: boolean;
	location: string;
	totalPrice: string;
	createdAt: string;
	updatedAt: string;
	cart: SPCDataCartInterface[];
	history: SPCDataHistoryInterface[];
	site: SPCDataSiteInterface;
	robot: SPCRobotInterface;
	order: SPCOrderInterface;
}

export interface SPCStateInterface {
	robotId?: string;
	page?: number;
	rowsPerPage?: number;
	billed?: boolean;
	debug?: boolean;
	locked?: string;
}

export interface SPCDataCartInterface {
	id: string;
	price: string;
	quantity: number;
	sku: string;
	title: string;
}

export interface SPCDataHistoryInterface {
	id: string;
	createdAt: string;
	type: string;
	payload: string;
}

export interface SPCDataSiteInterface {
	id: string;
}

export interface SPCRobotInterface {
	id: string;
}

export interface SPCOrderInterface {
	id: string;
}
