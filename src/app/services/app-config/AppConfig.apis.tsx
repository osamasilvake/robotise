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
					EMAIL: `${config.envAppUrl}/emails/:emailId`,
					ORDER_MODES: `${config.envAppUrl}/order-modes`,
					REPORTS: config.envAppUrl
				},
				SITES: {
					ALL: `${config.envAppUrl}/sites`,
					SINGLE: `${config.envAppUrl}/sites/:siteId`,
					PRODUCTS: `${config.envAppUrl}/products`,
					QR_CODES: `${config.envAppUrl}/room-qr-codes`,
					PHONE_CONFIGS: {
						FETCH: `${config.envAppUrl}/phone-dispatcher-configs`,
						SINGLE: `${config.envAppUrl}/phone-dispatcher-configs/:phoneConfigId`,
						AUDIO: `${config.envAppUrl}/phone-dispatcher-configs/:phoneConfigId/audio-messages`,
						PHONE_NUMBERS: `${config.envAppUrl}/twilio-phone-numbers`
					},
					PHONE_CALLS: `${config.envAppUrl}/inbound-calls`,
					STATISTICS: {
						WIFI_HEATMAP: `${config.envAppUrl}/wifi-heatmap`,
						MAPS: `${config.envAppUrl}/maps`
					},
					CONFIGURATION: {
						NOTIFICATION: {
							TYPES: `${config.envAppUrl}/notification-types`,
							USERS: `${config.envAppUrl}/notification-users`,
							USER: `${config.envAppUrl}/notification-users/:userId`
						},
						SERVICE_POSITIONS: `${config.envAppUrl}/service-positions`,
						CLEAN_TEST_ORDERS: `${config.envAppUrl}/sites/:siteId/clean-test-orders`,
						SITE_CONFIG: {
							ORDER_ORIGINS: `${config.envAppUrl}/order-origins`,
							CUSTOMER_NOTIFICATION_TYPES: `${config.envAppUrl}/customer-notification-types`
						}
					}
				},
				ROBOTS: {
					SUMMARY: `${config.envAppUrl}/robot-twins-summary`,
					ALL: `${config.envAppUrl}/robots`,
					SINGLE: `${config.envAppUrl}/robot-twins/:robotTwinId`,
					MAP: `${config.envAppUrl}/maps/:mapId`,
					COMMANDS: `${config.envAppUrl}/robots/:robotId/commands`,
					INVENTORY: `${config.envAppUrl}/robots/:robotId/inventory`,
					ORDERS: {
						FETCH: `${config.envAppUrl}/orders`,
						SINGLE: `${config.envAppUrl}/orders/:orderId`,
						RESTART: `${config.envAppUrl}/orders/:orderId/restart`
					},
					PURCHASES: {
						FETCH: `${config.envAppUrl}/order-reports`,
						SINGLE: `${config.envAppUrl}/order-reports/:purchaseId`
					},
					COMMANDS_LOGS: `${config.envAppUrl}/robot-commands`,
					ELEVATOR_CALLS: `${config.envAppUrl}/elevator-calls`,
					ELEVATOR_CALLS_TEST: `${config.envAppUrl}/test-elevator-calls/:siteId`,
					ELEVATOR_CALL_TEMPLATE: `${config.envAppUrl}/elevator-calls/:elevatorId/request-support-template`,
					CONFIGURATION: {
						SYNC_PRODUCTS: `${config.envAppUrl}/robots/:robotId/sync-products`,
						CONFIG: `${config.envAppUrl}/robots/:robotId`
					},
					PERFORMANCE: {
						PURCHASES: `${config.envAppUrl}/purchase-statistics`,
						ORDERS: `${config.envAppUrl}/order-statistics`,
						INVENTORY: `${config.envAppUrl}/inventory-statistics`
					}
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
				},
				MIDDLEWARE_CONFIG: `${config.envAppUrl}/cmd-events`,
				SETUP: {
					ROBOT_PASSWORD: `${config.envAppUrl}/robots-password`
				}
			},
			INFORMATION: {
				ALERT_CODES: `${config.envAppUrl}/active-alert-codes`
			}
		}
	};
};
export default AppServices;
