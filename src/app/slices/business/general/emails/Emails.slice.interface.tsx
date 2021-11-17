import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';
import { JsonApiResponseInterface } from '../../../JsonApi.interface';

export interface SliceEmailsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SEContentInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SEContentInterface extends JsonApiResponseInterface {
	data: SECDataInterface[];
	state?: SECStateInterface;
}

export interface SECDataInterface {
	id: string;
	from: SECDataFromInterface;
	recipient: string;
	subject: string;
	content: string;
	cc: string[];
	bcc: string[];
	history: SECDataHistoryInterface[];
	notificationCode: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	site: { id: string };
}

export interface SECDataFromInterface {
	email: string;
	name: string;
}

export interface SECDataHistoryInterface {
	event: string;
	reason: string;
	createdAt: Date;
}

export interface SECStateInterface {
	page?: number;
	rowsPerPage?: number;
	siteId?: string;
	delivered?: boolean;
}
