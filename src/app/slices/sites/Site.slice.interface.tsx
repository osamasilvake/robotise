import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import { ISite } from './Sites.slice.interface';

export interface SliceSiteInterface {
	servicePositions: {
		loading: boolean;
		content: SSContentServicePositionsInterface | null;
		errors: TriggerMessageInterface | null;
	};
	acceptOrders: {
		loading: boolean;
		content: ISite | null;
		errors: TriggerMessageInterface | null;
	};
	notifications: {
		loader: boolean;
		loading: boolean;
		content: SSContentNotificationTypesInterface | null;
		errors: TriggerMessageInterface | null;
	};
}

export interface SSContentServicePositionsInterface {
	data: {
		id: string;
		name: string;
		location: string;
	}[];
	site: {
		id: string;
	};
}

export interface SSContentNotificationTypesInterface {
	data: {
		id: string;
		userId: string;
		name: string;
		isActive: boolean;
		users: string[];
	}[];
	site: {
		id: string;
	};
}

export interface SSContentNotificationTypeInterface {
	id: string;
	name: string;
	code: string;
	desc: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface SSContentNotificationUsersInterface {
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
