const appRoutes = {
	HOME: '/',
	AUTH: {
		LOGIN: '/login'
	},
	SCREENS: {
		BUSINESS: {
			SITES: {
				MAIN: '/sites',
				DETAIL: '/sites/:site',
				PRODUCTS: {
					MAIN: '/sites/:site/products',
					DETAIL: '/sites/:site/products/:product'
				}
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
				},
				CONFIGURATION: '/robots/:robot/configuration'
			}
		},
		INFORMATION: {
			CHANGE_LOG: '/change-log',
			ABOUT: '/about-us'
		}
	}
};
export default appRoutes;
