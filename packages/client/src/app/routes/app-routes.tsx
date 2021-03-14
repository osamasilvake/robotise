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
				DETAIL: '/robot/:id',
				ORDER_REPORTS: '/robot/order-reports'
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
