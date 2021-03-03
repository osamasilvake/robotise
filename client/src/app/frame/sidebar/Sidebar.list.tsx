import ENV from '../../../environment';
import { sidebarListInterface } from './Sidebar.interface';

const sidebarPrimaryList: sidebarListInterface[] = [
	{
		id: 1,
		icon: 'domain',
		label: 'ROUTES.SITES',
		path: ENV().ROUTING.PACKAGES.SITES.MAIN
	},
	{
		id: 2,
		icon: 'android',
		label: 'ROUTES.ROBOTS',
		path: ENV().ROUTING.PACKAGES.ROBOTS.MAIN
	},
	{
		id: 3,
		icon: 'fastfood',
		label: 'ROUTES.PRODUCTS',
		path: ENV().ROUTING.PACKAGES.PRODUCTS.MAIN
	},
	{
		id: 4,
		icon: 'shopping_cart',
		label: 'ROUTES.ORDER_REPORTS',
		path: ENV().ROUTING.PACKAGES.ORDER_REPORTS.MAIN
	},
	{
		id: 5,
		icon: 'access_alarm',
		label: 'ROUTES.ALERT_CONFIG',
		path: ENV().ROUTING.PACKAGES.ALERT_CONFIG.MAIN,
		newLine: true
	}
];

const sidebarSecondaryList: sidebarListInterface[] = [
	{
		id: 1,
		icon: 'list_alt',
		label: 'ROUTES.CHANGELOG',
		path: ENV().ROUTING.PACKAGES.CHANGELOG
	}
];

export { sidebarPrimaryList, sidebarSecondaryList };
