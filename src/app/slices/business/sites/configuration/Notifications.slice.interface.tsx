import { TriggerMessageInterface } from '../../../../components/frame/message/Message.interface';

export interface SliceNotificationsInterface {
	loader: boolean;
	loading: boolean;
	updating: boolean;
	content: SNContentNotificationTypesInterface | null;
	errors: TriggerMessageInterface | null;
}

export interface SNContentNotificationTypesInterface {
	data: SNContentNotificationTypesDataInterface[];
	types: SNContentNotificationTypeInterface[];
	site: { id: string };
}

export interface SNContentNotificationTypesDataInterface {
	id: string;
	isActive: boolean;
	users: string[];
	typeId: string;
	typeName: string;
}

export interface SNContentNotificationTypeInterface {
	id: string;
	name: string;
	code: string;
	desc: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface SNContentNotificationUsersInterface {
	id: string;
	notificationType: { id: string };
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	users: SSContentNotificationUserInterface[];
}

export interface SSContentNotificationUserInterface {
	email: string;
	firstName: string;
	lastName: string;
	userId: string;
}
