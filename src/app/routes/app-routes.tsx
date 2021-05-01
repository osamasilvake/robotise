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
				ORDERS: {
					MAIN: '/robots/:robot/orders',
					DETAIL: '/robots/:robot/orders/:order'
				},
				PURCHASES: {
					MAIN: '/robots/:robot/purchases',
					DETAIL: '/robots/:robot/purchases/:purchase'
				}
			}
		},
		INFORMATION: {
			CHANGE_LOG: '/change-log',
			ABOUT: '/about-us'
		}
	}
};
export default appRoutes;
