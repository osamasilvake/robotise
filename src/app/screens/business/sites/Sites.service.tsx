import { AppConfigService, HttpClientService } from '../../../services';
import {
	SCCDataElementInterface,
	SCContentInterface
} from '../../../slices/business/sites/configuration/site/SiteConfiguration.slice.interface';
import { SRContentDataInterface } from '../../../slices/business/sites/rooms/Rooms.slice.interface';
import { removeEmptyObjProperties } from '../../../utilities/methods/Object';
import { DialogCleanTestOrdersFormInterface } from './content/configuration/cloud/clean-test-orders/SiteConfigurationCleanTestOrders.interface';
import { DialogCreateEditNotificationFormInterface } from './content/configuration/cloud/notifications/SiteConfigurationNotifications.interface';
import { SiteConfigurationPaymentSettingsFormInterface } from './content/configuration/cloud/payment-settings/SiteConfigurationPaymentSettings.interface';
import { SiteConfigFormInterface } from './content/configuration/cloud/site-config/SiteConfig.interface';
import { SiteRobotConfigFormInterface } from './content/configuration/cloud/site-robot-config/SiteRobotConfig.interface';
import { SiteConfigurationColdCallsFormInterface } from './content/configuration/cold-calls/SiteConfigurationColdCalls.interface';
import { SiteConfigurationMarketingRidesFormInterface } from './content/configuration/marketing-rides/SiteConfigurationMarketingRides.interface';
import { SitePerformancePayloadInterface } from './content/performance/SitePerformance.interface';
import { SitePhoneCallsListPayloadInterface } from './content/phone-calls/list/SitePhoneCallsList.interface';
import {
	DialogEditPhoneConfigFormInterface,
	DialogTestOutboundCallPhoneConfigFormInterface
} from './content/phone-configs/detail/actions/SitePhoneConfigsEdit.interface';
import { SitePhoneConfigUploadAudioInterface } from './content/phone-configs/detail/audio-messages/SitePhoneConfigsAudioMessages.interface';
import { SitePhoneConfigsPhoneNumbersTypeEnum } from './content/phone-configs/detail/SitePhoneConfigsDetail.enum';
import { SitePhoneConfigsSMSMessagesFormInterface } from './content/phone-configs/detail/sms-messages/SitePhoneConfigsSMSMessages.interface';
import { SiteProductCreateEditTypeEnum } from './content/products/list/table/SiteProductsTable.enum';
import { DialogCreateEditProductFormInterface } from './content/products/list/table/SiteProductsTable.interface';
import { DialogGenerateQRCodeFormInterface } from './content/rooms/list/grid/qr-code/SiteRoomsQRCode.interface';
import { SiteSMSListPayloadInterface } from './content/sms-list/SiteSMSList.interface';
import { SiteWifiHeatmapPayloadInterface } from './content/statistics/SiteStatistics.interface';
import { DialogCreateSiteFormInterface } from './list/actions/SitesActions.interface';
import {
	SiteCreateAxiosPostRequestInterface,
	SiteCreateAxiosPostResponseInterface,
	SiteCustomerNotificationTypesAxiosGetInterface,
	SiteElevatorVendorsAxiosGetInterface,
	SiteHelpPagesAxiosGetInterface,
	SiteMapsAxiosGetInterface,
	SiteMarketingRidesAxiosGetInterface,
	SiteNotificationTypesAxiosGetInterface,
	SiteNotificationUsersAxiosGetInterface,
	SiteOrderOriginsAxiosGetInterface,
	SitePerformanceInventoryAxiosGetInterface,
	SitePerformanceOrdersAxiosGetInterface,
	SitePerformancePurchasesAxiosGetInterface,
	SitePerformanceTopProductsAxiosGetInterface,
	SitePhoneCallsAxiosGetInterface,
	SitePhoneConfigPhoneNumbersAxiosGetInterface,
	SitePhoneConfigsAxiosGetInterface,
	SiteProductsAxiosGetInterface,
	SiteQRCodeCreateAxiosPostRequestInterface,
	SiteQRCodeCreateAxiosPostResponseInterface,
	SiteQRCodesAxiosGetInterface,
	SiteRoomsAxiosGetInterface,
	SitesAxiosGetInterface,
	SiteSMSListAxiosGetInterface,
	SiteWifiHeatmapAxiosGetInterface
} from './Sites.interface';

class SitesService {
	/**
	 * fetch sites
	 * @returns
	 */
	sitesFetch = () => {
		return HttpClientService.get<SitesAxiosGetInterface>(
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.ALL
		);
	};

	/**
	 * create a site
	 * @param payload
	 * @returns
	 */
	siteCreate = (payload: DialogCreateSiteFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.ALL;
		return HttpClientService.post<
			SiteCreateAxiosPostRequestInterface,
			SiteCreateAxiosPostResponseInterface
		>(url, {
			data: {
				type: 'sites',
				attributes: {
					title: payload.title,
					timezone: payload.timezone,
					currency: payload.currency,
					acceptOrders: false
				},
				relationships: {}
			}
		});
	};

	/**
	 * fetch site products
	 * @param siteId
	 * @returns
	 */
	siteProductsFetch = (siteId?: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PRODUCTS;
		return HttpClientService.get<SiteProductsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId || undefined
			}
		});
	};

	/**
	 * create/edit product
	 * @param siteId
	 * @param productId
	 * @param payload
	 * @param type
	 * @returns
	 */
	siteProductCreateEdit = (
		siteId: string,
		productId: string | undefined,
		payload: DialogCreateEditProductFormInterface,
		type: SiteProductCreateEditTypeEnum
	) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PRODUCTS;
		if (type === SiteProductCreateEditTypeEnum.EDIT) {
			return HttpClientService.patch(`${url}/${productId}`, {
				data: {
					type: 'products',
					id: productId,
					attributes: payload
				}
			});
		}
		return HttpClientService.post(url, {
			data: {
				type: 'products',
				attributes: removeEmptyObjProperties(payload),
				relationships: {
					site: {
						data: {
							type: 'sites',
							id: siteId
						}
					}
				}
			}
		});
	};

	/**
	 * delete product
	 * @param productId
	 * @returns
	 */
	siteProductDelete = (productId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PRODUCTS;
		return HttpClientService.delete(`${url}/${productId}`);
	};

	/**
	 * fetch floors
	 * @param siteId
	 * @returns
	 */
	sitesFloorsFetch = (siteId: string) => {
		return HttpClientService.get<SiteRoomsAxiosGetInterface>(
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.FLOORS.ALL,
			{
				params: {
					'filter[site]': siteId
				}
			}
		);
	};

	/**
	 * fetch locations
	 * @param siteId
	 * @param pageNum
	 * @returns
	 */
	sitesRoomsLocationsFetch = (siteId: string, pageNum: number) => {
		return HttpClientService.get<SiteRoomsAxiosGetInterface>(
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.LOCATIONS.ALL,
			{
				params: {
					'filter[site]': siteId,
					'page[number]': pageNum,
					'page[size]': 200
				}
			}
		);
	};

	/**
	 * update locations
	 * @param floorId
	 * @param isBlocked
	 * @returns
	 */
	siteRoomLocationsUpdate = (floorId: string, isBlocked: boolean) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.LOCATIONS.ALL;
		return HttpClientService.patch(url, {
			data: {
				type: 'locations',
				attributes: {
					metadata: {
						blocked: isBlocked
					}
				},
				relationships: {
					floor: { data: { type: 'floors', id: floorId } }
				}
			}
		});
	};

	/**
	 * update location
	 * @param locationId
	 * @param payload
	 * @returns
	 */
	siteRoomLocationUpdate = (location: SRContentDataInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.LOCATIONS.SINGLE.replace(
			':locationId',
			location.id
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'locations',
				id: location.id,
				attributes: {
					name: location.name,
					metadata: location.metadata
				}
			}
		});
	};

	/**
	 * fetch QR codes
	 * @param siteId
	 * @returns
	 */
	siteQRCodesFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.QR_CODES;
		return HttpClientService.get<SiteQRCodesAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId
			}
		});
	};

	/**
	 * create QR code
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteQRCodeCreate = (siteId: string, payload: DialogGenerateQRCodeFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.QR_CODES;
		return HttpClientService.post<
			SiteQRCodeCreateAxiosPostRequestInterface,
			SiteQRCodeCreateAxiosPostResponseInterface
		>(url, {
			data: {
				type: 'roomQrCodes',
				attributes: {
					room: payload.room,
					expirationDate: payload.date
				},
				relationships: {
					site: {
						data: {
							type: 'sites',
							id: siteId
						}
					}
				}
			}
		});
	};

	/**
	 * delete QR code
	 * @param siteId
	 * @param qrCodeId
	 * @returns
	 */
	siteQRCodeDelete = (siteId: string, qrCodeId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.QR_CODES;
		return HttpClientService.delete(`${url}/${qrCodeId}`, {
			params: {
				'filter[site]': siteId
			}
		});
	};

	/**
	 * fetch site phone configs
	 * @param siteId
	 * @returns
	 */
	sitePhoneConfigsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CONFIGS.FETCH;
		return HttpClientService.get<SitePhoneConfigsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId
			}
		});
	};

	/**
	 * edit phone config
	 * @param phoneConfigId
	 * @param payload
	 * @returns
	 */
	sitePhoneConfigEdit = (
		phoneConfigId: string,
		payload:
			| DialogEditPhoneConfigFormInterface
			| { [key: string]: SitePhoneConfigsSMSMessagesFormInterface }
	) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CONFIGS.SINGLE.replace(
				':phoneConfigId',
				phoneConfigId
			);
		const prefixes = payload.prefixes as string;

		return HttpClientService.patch(url, {
			data: {
				type: 'phone-dispatcher-configs',
				attributes: {
					mode: payload?.mode,
					prefixes: payload?.prefixes
						? prefixes?.split(',').map((e: string) => e.trim())
						: [],
					from: payload?.from,
					sip: { outboundPattern: payload?.outboundPattern || '' },
					callbackRetries: payload?.callbackRetries,
					smsGateway: payload?.smsGateway,
					smsMessages: payload?.smsMessages
				}
			}
		});
	};

	/**
	 * test phone config outbound call
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	sitePhoneConfigTestOutboundCall = (
		siteId: string,
		payload: DialogTestOutboundCallPhoneConfigFormInterface
	) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CONFIGS.TEST;
		return HttpClientService.post(url, {
			data: {
				type: 'outbound-calls',
				attributes: {
					location: payload.location,
					prefix: payload.prefix
				},
				relationships: {
					site: {
						data: {
							type: 'sites',
							id: siteId
						}
					}
				}
			}
		});
	};

	/**
	 * edit phone config SMS Messages
	 * @param phoneConfigId
	 * @param payload
	 * @returns
	 */
	sitePhoneConfigSmsMessagesEdit = (
		phoneConfigId: string,
		payload:
			| DialogEditPhoneConfigFormInterface
			| { [key: string]: SitePhoneConfigsSMSMessagesFormInterface }
	) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CONFIGS.SINGLE.replace(
				':phoneConfigId',
				phoneConfigId
			);

		return HttpClientService.patch(url, {
			data: {
				type: 'phone-dispatcher-configs',
				attributes: {
					smsMessages: payload?.smsMessages
				}
			}
		});
	};

	/**
	 * upload phone config audio
	 * @param phoneConfigId
	 * @param payload
	 * @returns
	 */
	sitePhoneConfigUploadAudio = (
		phoneConfigId: string,
		payload: SitePhoneConfigUploadAudioInterface
	) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CONFIGS.AUDIO.replace(
			':phoneConfigId',
			phoneConfigId
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'phone-dispatcher-config-audio-messages',
				attributes: payload
			}
		});
	};

	/**
	 * fetch phone config phone numbers
	 * @param capability
	 * @returns
	 */
	sitePhoneConfigsFetchPhoneNumbers = (capability: SitePhoneConfigsPhoneNumbersTypeEnum) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CONFIGS.PHONE_NUMBERS;
		return HttpClientService.get<SitePhoneConfigPhoneNumbersAxiosGetInterface>(url, {
			params: {
				'filter[capability]': capability
			}
		});
	};

	/**
	 * fetch site phone inbound calls
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	sitePhoneCallsInboundFetch = (siteId: string, payload: SitePhoneCallsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CALLS.INBOUND;
		return HttpClientService.get<SitePhoneCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId,
				'filter[withLocationName]': true,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage / 2
			}
		});
	};

	/**
	 * fetch site phone outbound calls
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	sitePhoneCallsOutboundFetch = (siteId: string, payload: SitePhoneCallsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CALLS.OUTBOUND;
		return HttpClientService.get<SitePhoneCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId,
				'filter[withLocationName]': true,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage / 2
			}
		});
	};

	/**
	 * fetch site SMS inbound calls
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteSMSListInboundFetch = (siteId: string, payload: SiteSMSListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SMS_LIST.INBOUND;
		return HttpClientService.get<SiteSMSListAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId,
				'filter[withLocationName]': true,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage / 2
			}
		});
	};

	/**
	 * fetch site SMS outbound calls
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteSMSListOutboundFetch = (siteId: string, payload: SiteSMSListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SMS_LIST.OUTBOUND;
		return HttpClientService.get<SiteSMSListAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId,
				'filter[withLocationName]': true,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage / 2
			}
		});
	};

	/**
	 * fetch wifi heatmap
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteWifiHeatmapFetch = (siteId: string, payload: SiteWifiHeatmapPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.STATISTICS.WIFI_HEATMAP;
		return HttpClientService.get<SiteWifiHeatmapAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId,
				'filter[floor]': payload.floor,
				'filter[createdAt][gte]': payload.period,
				'filter[createdAt][lte]': 'now'
			}
		});
	};

	/**
	 * fetch maps
	 * @param siteId
	 * @returns
	 */
	siteMapsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.STATISTICS.MAPS;
		return HttpClientService.get<SiteMapsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId
			}
		});
	};

	/**
	 * fetch performance purchases
	 * @param payload
	 * @returns
	 */
	sitePerformancePurchasesFetch = (payload: SitePerformancePayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PERFORMANCE.PURCHASES;
		return HttpClientService.get<SitePerformancePurchasesAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.site,
				'filter[lookup][period]': payload.lookup.period,
				'filter[lookup][unit]': payload.lookup.unit,
				'filter[excludeTotalPriceZero]': payload.excludeTotalPriceZero
			}
		});
	};

	/**
	 * fetch performance orders
	 * @param payload
	 * @returns
	 */
	sitePerformanceOrdersFetch = (payload: SitePerformancePayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PERFORMANCE.ORDERS;
		return HttpClientService.get<SitePerformanceOrdersAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.site,
				'filter[lookup][period]': payload.lookup.period,
				'filter[lookup][unit]': payload.lookup.unit
			}
		});
	};

	/**
	 * fetch performance inventory
	 * @param payload
	 * @returns
	 */
	sitePerformanceInventoryFetch = (payload: SitePerformancePayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PERFORMANCE.INVENTORY;
		return HttpClientService.get<SitePerformanceInventoryAxiosGetInterface>(url, {
			params: {
				'filter[robot]': payload.robot,
				'filter[lookup][period]': payload.lookup.period,
				'filter[lookup][unit]': payload.lookup.unit
			}
		});
	};

	/**
	 * fetch performance top products
	 * @param payload
	 * @returns
	 */
	sitePerformanceTopProductsFetch = (payload: SitePerformancePayloadInterface) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PERFORMANCE.PURCHASE_PRODUCTS;
		return HttpClientService.get<SitePerformanceTopProductsAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.site,
				'filter[lookup][period]': payload.lookup.period,
				'filter[lookup][unit]': payload.lookup.unit,
				'filter[topItems]': payload?.topItems || 10
			}
		});
	};

	/**
	 * accept orders
	 * @param siteId
	 * @param acceptOrders
	 * @returns
	 */
	siteOrdersAccept = (siteId: string, acceptOrders: boolean) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SINGLE.replace(
			':siteId',
			siteId
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'sites',
				id: siteId,
				attributes: {
					acceptOrders
				}
			}
		});
	};

	/**
	 * fetch site notification types
	 * @returns
	 */
	siteNotificationTypesFetch = () => {
		return HttpClientService.get<SiteNotificationTypesAxiosGetInterface>(
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.NOTIFICATION.TYPES
		);
	};

	/**
	 * fetch site notification users
	 * @param siteId
	 * @returns
	 */
	siteNotificationUsersFetch = (siteId: string) => {
		return HttpClientService.get<SiteNotificationUsersAxiosGetInterface>(
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.NOTIFICATION.USERS,
			{
				params: {
					site: siteId
				}
			}
		);
	};

	/**
	 * update notification
	 * @param payload
	 * @returns
	 */
	siteNotificationUpdate = (payload: DialogCreateEditNotificationFormInterface) => {
		const url = payload.siteId
			? AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.NOTIFICATION.USERS
			: AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.NOTIFICATION.USER.replace(
					':userId',
					payload.id || ''
			  );

		const request = {
			data: {
				attributes: {
					isActive: payload.isActive,
					users: payload.users?.map((email) => ({ email }))
				},
				relationships: payload.siteId
					? {
							notificationType: {
								data: {
									type: 'notificationTypes',
									id: payload.id
								}
							},
							site: {
								data: {
									type: 'sites',
									id: payload.siteId
								}
							}
					  }
					: undefined
			}
		};

		return payload.siteId
			? HttpClientService.post(url, request)
			: HttpClientService.patch(url, request);
	};

	/**
	 * update site robot config
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteRobotConfigUpdate = (siteId: string, payload: SiteRobotConfigFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SINGLE.replace(
			':siteId',
			siteId
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'sites',
				id: siteId,
				attributes: {},
				relationships: {
					robots: {
						data: [
							{
								type: 'robots',
								id: payload.robot?.robotId
							}
						]
					}
				}
			}
		});
	};

	/**
	 * update site config
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteConfigUpdate = (siteId: string, payload: SiteConfigFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SINGLE.replace(
			':siteId',
			siteId
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'sites',
				attributes: {
					title: payload.title,
					timezone: payload.timezone,
					currency: payload.currency,
					configs: {
						defaultOrderMode: payload.defaultOrderMode,
						availableOrderModes: payload.availableOrderModes,
						orderOriginsEnabled: payload.orderOriginsEnabled,
						customerNotificationTypesEnabled: payload.customerNotificationTypesEnabled,
						helpPage: payload.helpPage,
						showEmergencyWorkflow: payload.showEmergencyWorkflow,
						showPerformanceDashboard: payload.showPerformanceDashboard,
						showMarketingRides: payload?.showMarketingRides,
						showColdCalls: payload?.showColdCalls,
						isHidden: payload.isHidden
					},
					elevators:
						payload?.buildingId || payload?.vendor
							? {
									buildingId: payload?.buildingId || undefined,
									vendor: payload?.vendor || undefined
							  }
							: undefined
				}
			}
		});
	};

	/**
	 * fetch order origins
	 * @returns
	 */
	siteOrderOriginsFetch = () => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SITE_CONFIG
				.ORDER_ORIGINS;
		return HttpClientService.get<SiteOrderOriginsAxiosGetInterface>(url);
	};

	/**
	 * fetch customer notification types
	 * @returns
	 */
	siteCustomerNotificationTypesFetch = () => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SITE_CONFIG
				.CUSTOMER_NOTIFICATION_TYPES;
		return HttpClientService.get<SiteCustomerNotificationTypesAxiosGetInterface>(url);
	};

	/**
	 * fetch help pages
	 * @returns
	 */
	siteHelpPagesFetch = () => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SITE_CONFIG
				.HELP_PAGES;
		return HttpClientService.get<SiteHelpPagesAxiosGetInterface>(url);
	};

	/**
	 * fetch elevator vendors
	 * @returns
	 */
	siteElevatorVendorsFetch = () => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SITE_CONFIG
				.ELEVATOR_VENDORS;
		return HttpClientService.get<SiteElevatorVendorsAxiosGetInterface>(url);
	};

	/**
	 * update payment settings
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	sitePaymentSettingsUpdate = (
		siteId: string,
		payload: SiteConfigurationPaymentSettingsFormInterface
	) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SINGLE.replace(
			':siteId',
			siteId
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'sites',
				attributes: {
					paymentConfigs: {
						accountId: payload.accountId,
						defaultPreAuthorizedAmount: payload.defaultPreAuthorizedAmount,
						enabled: payload.enabled,
						liveMode: payload.liveMode
					}
				}
			}
		});
	};

	/**
	 * clean test orders
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteTestOrdersClean = (siteId: string, payload: DialogCleanTestOrdersFormInterface) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.CLEAN_TEST_ORDERS.replace(
				':siteId',
				siteId
			);
		return HttpClientService.post(url, {
			data: {
				type: 'site-action',
				attributes: {
					dateTo: payload.dateTo,
					timeTo: payload.timeTo
				}
			}
		});
	};

	/**
	 * fetch marketing rides
	 * @param siteId
	 * @returns
	 */
	siteMarketingRidesFetch = (siteId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.MARKETING_RIDES.ALL;
		return HttpClientService.get<SiteMarketingRidesAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId
			}
		});
	};

	/**
	 * update marketing rides
	 * @param marketingRideId
	 * @param payload
	 * @returns
	 */
	siteMarketingRidesUpdate = (
		marketingRideId: string,
		payload: SiteConfigurationMarketingRidesFormInterface
	) => {
		const configuration = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION;
		const url = configuration.MARKETING_RIDES.SINGLE;
		const { locations, ...rest } = payload;

		return HttpClientService.patch(url.replace(':marketingRideId', marketingRideId), {
			data: {
				type: 'marketing-rides',
				attributes: {
					...rest,
					times: payload.times
						?.filter((v) => v)
						?.filter((v) => v.minutes)
						?.map((v) => ({
							...v,
							minutes: v.minutes
								?.split(/\s*,\s*/)
								?.sort()
								?.map(Number)
						}))
				},
				relationships: {
					locations: {
						data: locations.map((l) => ({
							type: 'locations',
							id: l
						}))
					}
				}
			}
		});
	};

	/**
	 * fetch cold calls locations
	 * @param siteId
	 * @returns
	 */
	siteColdCallsLocationsFetch = (siteId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.COLD_CALLS.LOCATIONS;
		return HttpClientService.get<SiteMarketingRidesAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId
			}
		});
	};

	/**
	 * update cold calls locations
	 * @param siteId
	 * @param coldCallId
	 * @param payload
	 * @returns
	 */
	siteColdCallsLocationsUpdate = (siteId: string, coldCallId: string, locations: string[]) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.COLD_CALLS.LOCATIONS;

		const payload = {
			data: {
				type: 'cold-calls',
				id: siteId,
				attributes: {
					locations: locations?.map((l) => ({ locationId: l }))
				},
				relationships: {
					site: { data: { type: 'sites', id: siteId } }
				}
			}
		};

		return coldCallId
			? HttpClientService.patch(`${url}/${coldCallId}`, payload)
			: HttpClientService.post(url, payload);
	};

	/**
	 * update cold calls
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteColdCallsUpdate = (siteId: string, payload: SiteConfigurationColdCallsFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SINGLE.replace(
			':siteId',
			siteId
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'sites',
				id: siteId,
				attributes: {
					coldCallsConfigs: {
						schedule: {
							startTimeLocal: payload.startTimeLocal,
							endTimeLocal: payload.endTimeLocal,
							days: payload.days
						},
						enabled: payload.enabled
					}
				}
			}
		});
	};

	/**
	 * fetch site configuration
	 * @param siteId
	 * @returns
	 */
	siteConfigurationFetch = (siteId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SITE_CONFIGS.ALL;
		return HttpClientService.get<SCContentInterface>(url, {
			params: {
				'filter[site]': siteId,
				'filter[visibleIn]': 'roc-app'
			}
		});
	};

	/**
	 * update site configuration
	 * @param siteId
	 * @param configId
	 * @param payload
	 * @returns
	 */
	siteConfigurationUpdate = (
		siteId: string,
		configId: string,
		payload: SCCDataElementInterface
	) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SITE_CONFIGS.SINGLE;
		return HttpClientService.patch(url.replace(':configId', configId), {
			data: {
				type: 'robotConfigs',
				id: configId,
				attributes: payload.request,
				relationships: {
					site: {
						data: {
							type: 'sites',
							id: siteId
						}
					}
				}
			}
		});
	};
}
const instance = new SitesService();
export default instance;
