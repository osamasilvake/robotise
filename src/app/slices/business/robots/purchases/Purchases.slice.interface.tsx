import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonAPIResponseInterface } from '../../../JsonAPI.interface';

export interface SlicePurchasesInterface {
	init: boolean;
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
	id: string;
	comment: string;
	currency: string;
	isBilled: boolean;
	isDebug: boolean;
	location: string;
	totalPrice: string;
	createdAt: Date;
	updatedAt: Date;
	cart: SPCDataCartInterface[];
	history: SPCDataHistoryInterface[];
	site: SPCDataSiteInterface;
	robot: SPCRobotInterface;
	order: SPCOrderInterface;
}

export interface SPCStateInterface {
	pRobotId?: string;
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
	createdAt: Date;
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
