const appRoutes = {
	AUTH: {
		LOGIN: '/login'
	},
	SCREENS: {
		BUSINESS: {
			DASHBOARD: '/',
			SITES: {
				MAIN: '/sites'
			},
			ROBOTS: {
				MAIN: '/robots',
				DETAIL: '/robots/:robot',
				INVENTORY: '/robots/:robot/inventory',
				ORDER: '/robots/:robot/orders',
				PURCHASES: '/robots/:robot/purchases'
			}
		},
		INFORMATION: {
			ALERT_CONFIG: {
				MAIN: '/alert-config'
			},
			CHANGE_LOG: '/change-log',
			ABOUT: '/about-us'
		}
	}
};
export default appRoutes;
