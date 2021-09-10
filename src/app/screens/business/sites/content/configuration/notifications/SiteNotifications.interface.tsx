import { Dispatch, SetStateAction } from 'react';

import { SliceSiteInterface } from '../../../../../../slices/business/sites/Site.slice.interface';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';

export interface SiteNotificationsInterface {
	site: SliceSiteInterface;
}

export interface SiteNotificationInterface {
	site: SliceSiteInterface;
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
