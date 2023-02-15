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
					ALL_ORDERS: {
						FETCH: `${config.envAppUrl}/orders`,
						SINGLE: `${config.envAppUrl}/orders/:orderId`
					},
					ALL_ELEVATOR_CALLS: `${config.envAppUrl}/elevator-calls`,
					ALL_PHONE_CALLS: {
						INBOUND: `${config.envAppUrl}/inbound-calls`,
						OUTBOUND: `${config.envAppUrl}/outbound-calls`
					},
					ALL_SMS_LIST: {
						INBOUND: `${config.envAppUrl}/inbound-sms`,
						OUTBOUND: `${config.envAppUrl}/outbound-sms`
					},
					ORDER_MODES: `${config.envAppUrl}/order-modes`,
					REPORTS: config.envAppUrl
				},
				SITES: {
					ALL: `${config.envAppUrl}/sites`,
					SINGLE: `${config.envAppUrl}/sites/:siteId`,
					PRODUCTS: `${config.envAppUrl}/products`,
					FLOORS: {
						ALL: `${config.envAppUrl}/floors`
					},
					LOCATIONS: {
						ALL: `${config.envAppUrl}/locations`,
						SINGLE: `${config.envAppUrl}/locations/:locationId`
					},
					QR_CODES: `${config.envAppUrl}/room-qr-codes`,
					PHONE_CONFIGS: {
						FETCH: `${config.envAppUrl}/phone-dispatcher-configs`,
						SINGLE: `${config.envAppUrl}/phone-dispatcher-configs/:phoneConfigId`,
						AUDIO: `${config.envAppUrl}/phone-dispatcher-configs/:phoneConfigId/audio-messages`,
						PHONE_NUMBERS: `${config.envAppUrl}/twilio-phone-numbers`,
						TEST: `${config.envAppUrl}/test-outbound-call`
					},
					PHONE_CALLS: {
						INBOUND: `${config.envAppUrl}/inbound-calls`,
						OUTBOUND: `${config.envAppUrl}/outbound-calls`
					},
					SMS_LIST: {
						INBOUND: `${config.envAppUrl}/inbound-sms`,
						OUTBOUND: `${config.envAppUrl}/outbound-sms`
					},
					STATISTICS: {
						WIFI_HEATMAP: `${config.envAppUrl}/wifi-heatmap`,
						MAPS: `${config.envAppUrl}/maps`
					},
					PERFORMANCE: {
						PURCHASES: `${config.envAppUrl}/purchase-statistics`,
						ORDERS: `${config.envAppUrl}/order-statistics`,
						INVENTORY: `${config.envAppUrl}/inventory-statistics`,
						PURCHASE_PRODUCTS: `${config.envAppUrl}/purchase-product-statistics`
					},
					CONFIGURATION: {
						NOTIFICATION: {
							TYPES: `${config.envAppUrl}/notification-types`,
							USERS: `${config.envAppUrl}/notification-users`,
							USER: `${config.envAppUrl}/notification-users/:userId`
						},
						CLEAN_TEST_ORDERS: `${config.envAppUrl}/sites/:siteId/clean-test-orders`,
						SITE_CONFIG: {
							ORDER_ORIGINS: `${config.envAppUrl}/order-origins`,
							CUSTOMER_NOTIFICATION_TYPES: `${config.envAppUrl}/customer-notification-types`,
							HELP_PAGES: `${config.envAppUrl}/help-pages`,
							ELEVATOR_VENDORS: `${config.envAppUrl}/elevator-vendors`
						},
						MARKETING_RIDES: {
							ALL: `${config.envAppUrl}/marketing-rides`,
							SINGLE: `${config.envAppUrl}/marketing-rides/:marketingRideId`
						},
						COLD_CALLS: {
							LOCATIONS: `${config.envAppUrl}/cold-calls`
						},
						SITE_CONFIGS: {
							ALL: `${config.envAppUrl}/robot-configs`,
							SINGLE: `${config.envAppUrl}/robot-configs/:configId`
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
					ELEVATOR_CALLS: {
						FETCH: `${config.envAppUrl}/elevator-calls`,
						TEST: `${config.envAppUrl}/test-elevator-calls/:siteId`,
						TEMPLATE: `${config.envAppUrl}/elevator-calls/:elevatorId/request-support-template`,
						MANUAL_TEST: {
							SEND_LIFT: `${config.envAppUrl}/manual-elevator-call/:callId/liftId/:liftId`,
							ENTER_CAR: `${config.envAppUrl}/manual-elevator-call/:callId/enterCar`,
							EXIT_CAR: `${config.envAppUrl}/manual-elevator-call/:callId/exitCar`,
							FAIL_CALL: `${config.envAppUrl}/manual-elevator-call/:callId/fail`
						}
					},
					CONFIGURATION: {
						SYNC_PRODUCTS: `${config.envAppUrl}/robots/:robotId/sync-products`,
						CONFIG: `${config.envAppUrl}/robots/:robotId`,
						SYNC_CONFIGS: {
							ROBOT: `${config.envAppUrl}/robot-configs/sync-all/:robotId/robot`,
							SITE: `${config.envAppUrl}/robot-configs/sync-all/:robotId/site`
						},
						ROBOT_CONFIGS: {
							ALL: `${config.envAppUrl}/robot-configs`,
							SINGLE: `${config.envAppUrl}/robot-configs/:configId`
						}
					}
				}
			},
			SETTINGS: {
				DEEP_LINKS: `${config.envAppUrl}/deeplinks`,
				DEEP_LINK: {
					AUDIT_LOGS: `${config.envAppUrl}/deeplinks-request/audit-logs-robot-site`,
					ALERT_LOGS: `${config.envAppUrl}/deeplinks-request/robot-alerts-log`,
					ALERT_DASHBOARD_LOGS: `${config.envAppUrl}/deeplinks-request/robot-alerts-dashboard`,
					BATTERY: `${config.envAppUrl}/deeplinks-request/robot-battery-dashboard`,
					COOLING_UNIT: `${config.envAppUrl}/deeplinks-request/robot-cooling-unit`,
					DIAGNOSTICS_LOGS: `${config.envAppUrl}/deeplinks-request/robot-diagnostics-history`,
					ELEVATOR_LOGS: `${config.envAppUrl}/deeplinks-request/elevator-microservice-logs`,
					ITEM_TRACKING: `${config.envAppUrl}/deeplinks-request/item-tracking`,
					TEMPERATURE: `${config.envAppUrl}/deeplinks-request/robot-temperature`
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
