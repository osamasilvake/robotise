import { Dispatch, SetStateAction } from 'react';

import { SliceSiteInterface } from '../../../../../../slices/sites/Site.slice.interface';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';

export interface SiteNotificationsInterface {
	site: SliceSiteInterface;
}

export interface SiteNotificationInterface {
	site: SliceSiteInterface;
	notification: DialogCreateEditNotificationPayloadInterface;
}

export interface DialogCreateEditNotificationInterface {
	notification: DialogCreateEditNotificationPayloadInterface;
	type: SiteNotificationsCreateEditTypeEnum;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCreateEditNotificationPayloadInterface {
	id?: string;
	userId?: string;
	name?: string;
	isActive?: boolean;
	users: string[];
}
