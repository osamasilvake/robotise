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
				},
				ALL_ORDERS: {
					MAIN: '/general/orders',
					DETAIL: '/general/orders/:orderId'
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
				CONFIGURATION: '/sites/:siteId/configuration',
				PERFORMANCE: '/sites/:siteId/performance'
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
				COMMANDS_LOG: '/robots/:robotId/commands-log',
				ELEVATOR_CALLS: '/robots/:robotId/elevator-calls',
				CONFIGURATION: '/robots/:robotId/configuration'
			}
		},
		SETTINGS: {
			DEEP_LINKS: '/deeplinks',
			MIDDLEWARE_CONFIG: '/middleware-config',
			SETUP: {
				MAIN: '/setup',
				WIFI_CONFIG: '/setup/wifi-config',
				ROBOT_PASSWORD: '/setup/robot-password'
			}
		},
		INFORMATION: {
			ALERT_CODES: '/alert-codes'
		}
	}
};
export default appRoutes;
