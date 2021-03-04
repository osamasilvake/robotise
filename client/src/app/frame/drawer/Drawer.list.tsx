import ENV from '../../../environment';
import { DrawerListInterface } from './Drawer.interface';

const drawerBusinessList: DrawerListInterface[] = [
	{
		id: 1,
		icon: 'apartment',
		label: 'BUSINESS.SITES.LABEL',
		hint: 'BUSINESS.SITES.HINT',
		path: ENV().ROUTING.SCREENS.BUSINESS.SITES.MAIN
	},
	{
		id: 2,
		icon: 'android',
		label: 'BUSINESS.ROBOTS.LABEL',
		hint: 'BUSINESS.ROBOTS.HINT',
		path: ENV().ROUTING.SCREENS.BUSINESS.ROBOTS.MAIN
	}
];

const drawerInformationList: DrawerListInterface[] = [
	{
		id: 1,
		icon: 'access_alarm',
		label: 'INFORMATION.ALERT_CONFIG',
		path: ENV().ROUTING.SCREENS.INFORMATION.ALERT_CONFIG.MAIN,
		newLine: true
	},
	{
		id: 2,
		icon: 'assignment',
		label: 'INFORMATION.CHANGELOGS',
		path: ENV().ROUTING.SCREENS.INFORMATION.CHANGELOGS
	}
];

export { drawerBusinessList, drawerInformationList };
