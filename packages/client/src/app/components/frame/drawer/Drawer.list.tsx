import ENV from '../../../../environment';
import { DrawerListBadgeTypeEnum } from './Drawer.enum';
import { DrawerListInterface } from './Drawer.interface';

const drawerBusinessList: DrawerListInterface[] = [
	{
		id: 1,
		icon: 'apartment',
		label: 'SIDEBAR.BUSINESS.LIST.SITES.LABEL',
		hint: 'SIDEBAR.BUSINESS.LIST.SITES.HINT',
		path: ENV().ROUTING.SCREENS.BUSINESS.SITES.MAIN
	},
	{
		id: 2,
		icon: 'android',
		label: 'SIDEBAR.BUSINESS.LIST.ROBOTS.LABEL',
		hint: 'SIDEBAR.BUSINESS.LIST.ROBOTS.HINT',
		path: ENV().ROUTING.SCREENS.BUSINESS.ROBOTS.MAIN,
		badge: DrawerListBadgeTypeEnum.ROBOT
	}
];

const drawerInformationList: DrawerListInterface[] = [
	{
		id: 1,
		icon: 'access_alarm',
		label: 'SIDEBAR.INFORMATION.LIST.ALERT_CONFIG',
		path: ENV().ROUTING.SCREENS.INFORMATION.ALERT_CONFIG.MAIN,
		newLine: true
	},
	{
		id: 2,
		icon: 'assignment',
		label: 'SIDEBAR.INFORMATION.LIST.CHANGE_LOG',
		path: ENV().ROUTING.SCREENS.INFORMATION.CHANGE_LOG
	},
	{
		id: 3,
		icon: 'info',
		label: 'SIDEBAR.INFORMATION.LIST.ABOUT',
		path: ENV().ROUTING.SCREENS.INFORMATION.ABOUT
	}
];

export { drawerBusinessList, drawerInformationList };
