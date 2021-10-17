const appRoutes = {
	HOME: '/',
	AUTH: {
		LOGIN: '/login'
	},
	SCREENS: {
		BUSINESS: {
			SITES: {
				MAIN: '/sites',
				DETAIL: '/sites/:siteId',
				PRODUCTS: {
					MAIN: '/sites/:siteId/products',
					DETAIL: '/sites/:siteId/products/:product'
				},
				ROOMS: '/sites/:siteId/rooms',
				CONFIGURATION: '/sites/:siteId/configuration',
				PHONE_CONFIGS: '/sites/:siteId/phone-configs',
				PHONE_CALLS: '/sites/:siteId/phone-calls'
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
					MAIN: '/robots/:robotId/purchases',
					DETAIL: '/robots/:robotId/purchases/:purchaseId'
				},
				CONFIGURATION: '/robots/:robotId/configuration',
				COMMANDS_LOG: '/robots/:robotId/commands-log',
				ELEVATOR_CALLS: '/robots/:robotId/elevator-calls'
			}
		},
		INFORMATION: {
			ALERT_CODES: '/alert-codes',
			ABOUT: '/about-us'
		}
	}
};
export default appRoutes;
