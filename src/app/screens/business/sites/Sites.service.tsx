import { AppConfigService, HttpClientService } from '../../../services';
import { removeEmptyObjProperties } from '../../../utilities/methods/Object';
import { DialogCleanTestOrdersFormInterface } from './content/configuration/clean-test-orders/SiteCleanTestOrders.interface';
import { DialogCreateEditNotificationFormInterface } from './content/configuration/notifications/SiteNotifications.interface';
import { SiteServicePositionsCreateEditTypeEnum } from './content/configuration/service-positions/SiteServicePositions.enum';
import { DialogCreateEditServicePositionFormInterface } from './content/configuration/service-positions/SiteServicePositions.interface';
import { SiteConfigFormInterface } from './content/configuration/site-config/SiteConfig.interface';
import { SiteRobotConfigFormInterface } from './content/configuration/site-robot-config/SiteRobotConfig.interface';
import { SitePhoneCallsListPayloadInterface } from './content/phone-calls/list/SitePhoneCallsList.interface';
import { DialogEditPhoneConfigFormInterface } from './content/phone-configs/detail/actions/SitePhoneConfigsEdit.interface';
import { SitePhoneConfigUploadAudioInterface } from './content/phone-configs/detail/audio-messages/SitePhoneConfigsAudioMessages.interface';
import { SitePhoneConfigsPhoneNumbersTypeEnum } from './content/phone-configs/detail/SitePhoneConfigsDetail.enum';
import { SiteProductCreateEditTypeEnum } from './content/products/list/table/SiteProductsTable.enum';
import { DialogCreateEditProductFormInterface } from './content/products/list/table/SiteProductsTable.interface';
import { DialogModifyRoomsFormInterface } from './content/rooms/list/actions/SiteRoomsActions.interface';
import { DialogGenerateQRCodeFormInterface } from './content/rooms/list/grid/SiteRoomsGrid.interface';
import { SiteWifiHeatmapPayloadInterface } from './content/statistics/SiteStatistics.interface';
import { DialogCreateSiteFormInterface } from './list/actions/SitesActions.interface';
import {
	RobotQRCodeCreateAxiosPostResponseInterface,
	SiteCreateAxiosPostRequestInterface,
	SiteCreateAxiosPostResponseInterface,
	SiteMapsAxiosGetInterface,
	SiteNotificationTypesAxiosGetInterface,
	SiteNotificationUsersAxiosGetInterface,
	SitePhoneCallsAxiosGetInterface,
	SitePhoneConfigPhoneNumbersAxiosGetInterface,
	SitePhoneConfigsAxiosGetInterface,
	SiteProductsAxiosGetInterface,
	SiteQRCodeCreateAxiosPostRequestInterface,
	SiteQRCodesAxiosGetInterface,
	SiteRoomsAxiosPatchRequestInterface,
	SiteRoomsAxiosPatchResponseInterface,
	SitesAxiosGetInterface,
	SiteServicePositionsAxiosGetInterface,
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
					rooms: {
						whitelist: null
					},
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
	 * update room state
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteRoomStateUpdate = (siteId: string, payload: DialogModifyRoomsFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SINGLE.replace(
			':siteId',
			siteId
		);
		return HttpClientService.patch<
			SiteRoomsAxiosPatchRequestInterface,
			SiteRoomsAxiosPatchResponseInterface
		>(url, {
			data: {
				type: 'sites',
				id: siteId,
				attributes: {
					rooms: {
						whitelist: payload.whitelist as string[],
						available: payload.available || undefined
					}
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
			RobotQRCodeCreateAxiosPostResponseInterface
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
	sitePhoneConfigEdit = (phoneConfigId: string, payload: DialogEditPhoneConfigFormInterface) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CONFIGS.SINGLE.replace(
				':phoneConfigId',
				phoneConfigId
			);
		return HttpClientService.patch(url, {
			data: {
				type: 'phone-dispatcher-configs',
				attributes: {
					mode: payload.mode,
					prefixes: payload.prefixes
						? payload.prefixes.split(',').map((e: string) => e.trim())
						: [],
					from: payload.from,
					roomsMapping: payload.roomsMapping,
					sip: { outboundPattern: payload?.outboundPattern || '' },
					callbackRetries: payload.callbackRetries,
					smsGateway: payload.smsGateway,
					smsMessages: payload.smsMessages
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
	 * fetch site phone calls
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	sitePhoneCallsFetch = (siteId: string, payload: SitePhoneCallsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CALLS;
		return HttpClientService.get<SitePhoneCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
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
				'filter[createdAt][gte]': 'now-7d',
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
	 * fetch service positions
	 * @param siteId
	 * @returns
	 */
	siteServicePositionsFetch = (siteId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SERVICE_POSITIONS.replace(
				':siteId',
				siteId
			);
		return HttpClientService.get<SiteServicePositionsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId
			}
		});
	};

	/**
	 * create/edit service position
	 * @param siteId
	 * @param payload
	 * @param type
	 * @returns
	 */
	siteServicePositionCreateEdit = (
		siteId: string,
		payload: DialogCreateEditServicePositionFormInterface,
		type: SiteServicePositionsCreateEditTypeEnum
	) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SERVICE_POSITIONS;
		const request = {
			data: {
				attributes: {
					name: payload.name,
					location: payload.location
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
		};

		return type === SiteServicePositionsCreateEditTypeEnum.CREATE
			? HttpClientService.post(url, request)
			: HttpClientService.patch(`${url}/${payload.id}`, request);
	};

	/**
	 * delete service position
	 * @param servicePositionId
	 * @returns
	 */
	siteServicePositionDelete = (servicePositionId: string) => {
		const url =
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIGURATION.SERVICE_POSITIONS;
		return HttpClientService.delete(`${url}/${servicePositionId}`);
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
								id: payload.robotId
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
						helpPage: payload.helpPage,
						qrOrdersEnabled: payload.qrOrdersEnabled,
						showEmergencyWorkflow: payload.showEmergencyWorkflow,
						isHidden: payload.isHidden
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
}
const instance = new SitesService();
export default instance;
