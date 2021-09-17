import { Dispatch, SetStateAction } from 'react';

import {
	SliceNotificationsInterface,
	SNContentNotificationTypesDataInterface
} from '../../../../../../slices/business/sites/configuration/Notifications.slice.interface';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';

export interface SiteNotificationsInterface {
	notifications: SliceNotificationsInterface;
}

export interface SiteNotificationInterface {
	notifications: SliceNotificationsInterface;
	notification: SNContentNotificationTypesDataInterface;
	index: number;
}

export interface DialogCreateEditNotificationInterface {
	type: SiteNotificationsCreateEditTypeEnum;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	index?: number;
}

export interface DialogCreateEditNotificationFormInterface {
	id?: string;
	name?: string;
	isActive?: boolean;
	users: string[];
	siteId?: string;
}
