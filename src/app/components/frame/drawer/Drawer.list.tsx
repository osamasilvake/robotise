import { AppConfigService } from '../../../services';
import { DrawerListBadgeTypeEnum } from './Drawer.enum';
import { DrawerListInterface } from './Drawer.interface';

const drawerBusinessList: DrawerListInterface[] = [
	{
		icon: 'apps',
		label: 'BUSINESS.LIST.GENERAL',
		hint: '📮',
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.MAIN
	},
	{
		icon: 'apartment',
		label: 'BUSINESS.LIST.SITES',
		hint: '🏢  🍔  🛌🏻  📞  📈  ⚙️',
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.SITES.MAIN
	},
	{
		icon: 'android',
		label: 'BUSINESS.LIST.ROBOTS',
		hint: '🤖  🗄  📦  🛒  📝  ⚙️',
		path: AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN,
		badge: DrawerListBadgeTypeEnum.ROBOT
	}
];

const drawerSettingsList: DrawerListInterface[] = [
	{
		icon: 'link',
		label: 'SETTINGS.LIST.DEEP_LINKS',
		path: AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS,
		scope: true
	}
];

const drawerInformationList: DrawerListInterface[] = [
	{
		icon: 'access_alarm',
		label: 'INFORMATION.LIST.ALERT_CODES',
		path: AppConfigService.AppRoutes.SCREENS.INFORMATION.ALERT_CODES
	},
	{
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
