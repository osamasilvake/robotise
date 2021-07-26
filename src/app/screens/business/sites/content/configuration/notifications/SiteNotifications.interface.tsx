import { Dispatch, SetStateAction } from 'react';

import { SliceSiteInterface } from '../../../../../../slices/sites/Site.slice.interface';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';

export interface SiteNotificationsInterface {
	site: SliceSiteInterface;
}

export interface SiteNotificationInterface {
	site: SliceSiteInterface;
	index: number;
}

export interface DialogCreateEditNotificationInterface {
	index?: number;
	type: SiteNotificationsCreateEditTypeEnum;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DialogCreateEditNotificationPayloadInterface {
	id?: string;
	name?: string;
	isActive?: boolean;
	users: string[];
	siteId?: string;
}
