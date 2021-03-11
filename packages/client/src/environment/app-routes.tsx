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
					MAIN: '/products'
				}
			},
			ROBOTS: {
				MAIN: '/robots',
				ORDER_REPORTS: {
					MAIN: '/order-reports'
				}
			}
		},
		INFORMATION: {
			ALERT_CONFIG: {
				MAIN: '/alert-config'
			},
			CHANGE_LOG: '/change-log',
			ABOUT: '/about-us'
		},
		PAGES: {
			E404: '/e-404'
		}
	}
};
export default appRoutes;
