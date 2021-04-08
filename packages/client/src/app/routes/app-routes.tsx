const appRoutes = {
	AUTH: {
		LOGIN: '/login'
	},
	SCREENS: {
		BUSINESS: {
			DASHBOARD: '/',
			SITES: {
				MAIN: '/sites',
				PRODUCTS: {
					MAIN: 'site/products',
					CREATE: 'site/product/create',
					UPDATE: 'site/product/update/:id',
					READ: 'site/product/read/:id'
				}
			},
			ROBOTS: {
				MAIN: '/robots',
				DETAIL: '/robots/:id',
				INVENTORY: '/robots/:id/inventory',
				ORDER: '/robots/:id/orders',
				PURCHASES: '/robots/:id/purchases',
				INFORMATION: '/robots/:id/information'
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
