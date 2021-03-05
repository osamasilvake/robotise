import ENV from '../../../environment';
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
		path: ENV().ROUTING.SCREENS.BUSINESS.ROBOTS.MAIN
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
		label: 'SIDEBAR.INFORMATION.LIST.CHANGELOGS',
		path: ENV().ROUTING.SCREENS.INFORMATION.CHANGELOGS
	}
];

export { drawerBusinessList, drawerInformationList };
