import { Dispatch, SetStateAction } from 'react';

import {
	SliceNotificationsInterface,
	SNContentNotificationTypesDataInterface
} from '../../../../../../slices/business/sites/configuration/Notifications.slice.interface';
import { SiteConfigurationNotificationsCreateEditTypeEnum } from './SiteConfigurationNotifications.enum';

export interface SiteConfigurationNotificationsInterface {
	notifications: SliceNotificationsInterface;
}

export interface SiteConfigurationNotificationInterface {
	notifications: SliceNotificationsInterface;
	notification: SNContentNotificationTypesDataInterface;
	index: number;
}

export interface DialogCreateEditNotificationInterface {
	type: SiteConfigurationNotificationsCreateEditTypeEnum;
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
