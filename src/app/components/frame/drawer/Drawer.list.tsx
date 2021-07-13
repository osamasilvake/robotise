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

export { drawerBusinessList, drawerInformationList };
