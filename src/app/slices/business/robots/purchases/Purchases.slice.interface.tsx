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
	locationId: string;
	totalPrice: string;
	createdAt: Date;
	updatedAt: Date;
	cart: SPCDataCartInterface[];
	history: SPCDataHistoryInterface[];
	paymentData: SPCDataPaymentInterface;
	site: SPCSiteInterface;
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

export interface SPCDataPaymentInterface {
	isPaid: boolean;
	method: string;
	payment: {
		id: string;
		accountId: string;
		capturedAmount: number;
		currency: string;
		isCaptured: boolean;
		isDebug: boolean;
		preAuthorizedAmount: boolean;
		status: string;
		updatedAt: string;
		vendorId: string;
		receiptUrl: string;
		vendorPaymentUrl: string;
		preAuthorizedAt: Date;
		capturedAt: Date;
		createdAt: Date;
	};
	transactionId: string;
	vendor: string;
}

export interface SPCSiteInterface {
	id: string;
}

export interface SPCRobotInterface {
	id: string;
}

export interface SPCOrderInterface {
	id: string;
}
