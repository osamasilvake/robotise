import { AppConfigService } from '..';

/**
 * app services
 * @param config
 * @returns
 */
const AppServices = (config: typeof AppConfigService) => {
	return {
		COMMON: {
			LOGS: `${config.envAppUrl}/frontend-logs`
		},
		AUTH: {
			SIGN_IN: `${config.envAppUrl}/auth/${config.envRealm}/login`,
			AUTO_REFRESH: `${config.envAppUrl}/auth/${config.envRealm}/refresh`
		},
		SCREENS: {
			BUSINESS: {
				GENERAL: {
					EMAILS: `${config.envAppUrl}/emails`,
					EMAIL: `${config.envAppUrl}/emails/:emailId`
				},
				SITES: {
					ALL: `${config.envAppUrl}/sites`,
					SINGLE: `${config.envAppUrl}/sites/:siteId`,
					PRODUCTS: `${config.envAppUrl}/products`,
					PHONE_CONFIGS: `${config.envAppUrl}/phone-dispatcher-configs`,
					PHONE_CALLS: `${config.envAppUrl}/inbound-calls`,
					STATISTICS: {
						WIFI_HEATMAP: `${config.envAppUrl}/wifi-heatmap`,
						MAPS: `${config.envAppUrl}/maps`
					},
					CONFIGURATION: {
						CONFIG: `${config.envAppUrl}/sites/:siteId`,
						NOTIFICATION: {
							TYPES: `${config.envAppUrl}/notification-types`,
							USERS: `${config.envAppUrl}/notification-users`,
							USER: `${config.envAppUrl}/notification-users/:userId`
						},
						SERVICE_POSITIONS: `${config.envAppUrl}/service-positions`,
						CLEAN_TEST_ORDERS: `${config.envAppUrl}/sites/:siteId/clean-test-orders`
					},
					REPORTS: config.envAppUrl
				},
				ROBOTS: {
					SUMMARY: `${config.envAppUrl}/robot-twins-summary`,
					ALL: `${config.envAppUrl}/robots`,
					SINGLE: `${config.envAppUrl}/robot-twins/:robotTwinId`,
					MAP: `${config.envAppUrl}/maps/:mapId`,
					COMMANDS: `${config.envAppUrl}/robots/:robotId/commands`,
					INVENTORY: `${config.envAppUrl}/robots/:robotId/inventory`,
					ORDERS: `${config.envAppUrl}/orders`,
					ORDER: `${config.envAppUrl}/orders/:orderId`,
					PURCHASES: `${config.envAppUrl}/order-reports`,
					PURCHASE: `${config.envAppUrl}/order-reports/:purchaseId`,
					COMMANDS_LOGS: `${config.envAppUrl}/robot-commands`,
					ELEVATOR_CALLS: `${config.envAppUrl}/elevator-calls`,
					ELEVATOR_CALLS_TEST: `${config.envAppUrl}/test-elevator-calls/:siteId`,
					ELEVATOR_CALL_TEMPLATE: `${config.envAppUrl}/elevator-calls/:elevatorId/request-support-template`,
					CONFIGURATION: {
						SYNC_PRODUCTS: `${config.envAppUrl}/robots/:robotId/sync-products`,
						CONFIG: `${config.envAppUrl}/robots/:robotId`
					},
					REPORTS: config.envAppUrl
				}
			},
			SETTINGS: {
				DEEP_LINKS: `${config.envAppUrl}/deeplinks`,
				DEEP_LINK: {
					AUDIT_LOGS: `${config.envAppUrl}/deeplinks-request/audit-logs-robot-site`,
					BATTERY: `${config.envAppUrl}/deeplinks-request/robot-battery-dashboard`,
					TEMPERATURE: `${config.envAppUrl}/deeplinks-request/robot-temperature`,
					DIAGNOSTICS_LOGS: `${config.envAppUrl}/deeplinks-request/robot-diagnostics-history`,
					COOLING_UNIT: `${config.envAppUrl}/deeplinks-request/robot-cooling-unit`,
					ITEM_TRACKING: `${config.envAppUrl}/deeplinks-request/item-tracking`,
					ELEVATOR_LOGS: `${config.envAppUrl}/deeplinks-request/elevator-microservice-logs`,
					ALERT_LOGS: `${config.envAppUrl}/deeplinks-request/robot-alerts-log`
				}
			},
			INFORMATION: {
				ALERT_CODES: `${config.envAppUrl}/active-alert-codes`
			}
		}
	};
};
export default AppServices;
