const appRoutes = {
	HOME: '/',
	AUTH: {
		LOGIN: '/login'
	},
	SCREENS: {
		BUSINESS: {
			GENERAL: {
				MAIN: '/general',
				EMAILS: {
					MAIN: '/general/emails',
					DETAIL: '/general/emails/:emailId'
				}
			},
			SITES: {
				MAIN: '/sites',
				DETAIL: '/sites/:siteId',
				PRODUCTS: {
					MAIN: '/sites/:siteId/products',
					DETAIL: '/sites/:siteId/products/:product'
				},
				ROOMS: '/sites/:siteId/rooms',
				PHONE_CONFIGS: '/sites/:siteId/phone-configs',
				PHONE_CALLS: '/sites/:siteId/phone-calls',
				STATISTICS: '/sites/:siteId/statistics',
				CONFIGURATION: '/sites/:siteId/configuration'
			},
			ROBOTS: {
				MAIN: '/robots',
				DETAIL: '/robots/:robotId',
				INVENTORY: '/robots/:robotId/inventory',
				ORDERS: {
					MAIN: '/robots/:robotId/orders',
					DETAIL: '/robots/:robotId/orders/:orderId'
				},
				PURCHASES: {
					MAIN: '/robots/:robotId/orderReports',
					DETAIL: '/robots/:robotId/orderReports/:purchaseId'
				},
				COMMANDS_LOG: '/robots/:robotId/commands-log',
				ELEVATOR_CALLS: '/robots/:robotId/elevator-calls',
				CONFIGURATION: '/robots/:robotId/configuration'
			}
		},
		SETTINGS: {
			DEEP_LINKS: '/deeplinks'
		},
		INFORMATION: {
			ALERT_CODES: '/alert-codes',
			ABOUT: '/about-us'
		}
	}
};
export default appRoutes;
