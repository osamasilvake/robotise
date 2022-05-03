import { TriggerMessageInterface } from '../../../../../components/frame/message/Message.interface';

export interface SliceQRCodesInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SQRContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SQRContentInterface {
	data: SQRDataInterface[];
	dataById: SQRDataByIdInterface;
	state?: SQRStateInterface;
}

export interface SQRDataByIdInterface {
	[key: string]: SQRDataInterface;
}

export interface SQRDataInterface {
	id: string;
	code: string;
	smsTo: string;
	room: string;
	isExpired: boolean;
	expirationDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface SQRStateInterface {
	pRobotId?: string;
}
