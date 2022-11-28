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
				},
				ALL_ELEVATOR_CALLS: '/general/elevator-calls',
				ALL_PHONE_CALLS: '/general/phone-calls',
				ALL_SMS_LIST: '/general/sms-list'
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
				SMS_LIST: '/sites/:siteId/sms-list',
				STATISTICS: '/sites/:siteId/statistics',
				PERFORMANCE: '/sites/:siteId/performance',
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
