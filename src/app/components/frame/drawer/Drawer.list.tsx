import { AppConfigService } from '../../../services';
import { DrawerListBadgeTypeEnum } from './Drawer.enum';
import { DrawerListInterface } from './Drawer.interface';

const drawerBusinessList: DrawerListInterface[] = [
	{
		id: 1,
		icon: 'apartment',
		label: 'BUSINESS.LIST.SITES',
		hint: '🏢  🍔  🛌🏻  ⚙️',
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.MAIN
	},
	{
		id: 2,
		icon: 'android',
		label: 'BUSINESS.LIST.ROBOTS',
		hint: '🤖  🗄  📦  🛒  ⚙️',
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN,
		badge: DrawerListBadgeTypeEnum.ROBOT
	}
];

const drawerSettingsList: DrawerListInterface[] = [
	{
		id: 1,
		icon: 'link',
		label: 'SETTINGS.LIST.DEEP_LINKS',
		path: AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS,
		newLine: true
	}
];

const drawerInformationList: DrawerListInterface[] = [
	{
		id: 1,
		icon: 'access_alarm',
		label: 'INFORMATION.LIST.ALERT_CODES',
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ALERT_CODES,
		newLine: true
	},
	{
		id: 2,
		icon: 'info',
		label: 'INFORMATION.LIST.ABOUT',
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ABOUT
	}
];

export const DrawersList = [
	{
		primary: 'BUSINESS.TITLE.MAIN',
		secondary: 'BUSINESS.TITLE.SHORT',
		list: drawerBusinessList
	},
	{
		primary: 'SETTINGS.TITLE.MAIN',
		secondary: 'SETTINGS.TITLE.SHORT',
		list: drawerSettingsList
	},
	{
		primary: 'INFORMATION.TITLE.MAIN',
		secondary: 'INFORMATION.TITLE.SHORT',
		list: drawerInformationList
	}
];
