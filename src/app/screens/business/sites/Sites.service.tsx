import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { AppConfigService, HttpClientService } from '../../../services';
import { removeEmptyObjProperties } from '../../../utilities/methods/Object';
import { DialogCreateEditNotificationFormInterface } from './content/configuration/notifications/SiteNotifications.interface';
import { SiteServicePositionsCreateEditTypeEnum } from './content/configuration/service-positions/SiteServicePositions.enum';
import { DialogCreateEditServicePositionFormInterface } from './content/configuration/service-positions/SiteServicePositions.interface';
import { SiteConfigFormInterface } from './content/configuration/site-config/SiteConfig.interface';
import { SiteRobotConfigFormInterface } from './content/configuration/site-robot-config/SiteRobotConfig.interface';
import { SitePhoneCallsListPayloadInterface } from './content/phone-calls/list/SitePhoneCallsList.interface';
import { SiteProductCreateEditTypeEnum } from './content/products/list/table/SiteProductsTable.enum';
import { DialogCreateEditProductFormInterface } from './content/products/list/table/SiteProductsTable.interface';
import { SiteWifiHeatmapPayloadInterface } from './content/statistics/SiteStatistics.interface';
import {
	SiteNotificationTypesAxiosGetInterface,
	SiteNotificationUsersAxiosGetInterface,
	SitePhoneCallsAxiosGetInterface,
	SitePhoneConfigsAxiosGetInterface,
	SiteProductsAxiosGetInterface,
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
	 * fetch site products
	 * @param siteId
	 * @returns
	 */
	siteProductsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PRODUCTS;
		return HttpClientService.get<SiteProductsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId
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
	 * @param whitelist
	 * @returns
	 */
	siteRoomStateUpdate = (siteId: string, whitelist: string[]) => {
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
						whitelist
					}
				}
			}
		});
	};

	/**
	 * fetch site phone configs
	 * @param siteId
	 * @returns
	 */
	sitePhoneConfigsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PHONE_CONFIGS;
		return HttpClientService.get<SitePhoneConfigsAxiosGetInterface>(url, {
			params: {
				'filter[site]': siteId
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
	 * fetch wifi data for heatmap
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteWifiHeatmapDataFetch = (siteId: string, payload: SiteWifiHeatmapPayloadInterface) => {
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
	 * update site config
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteConfigUpdate = (siteId: string, payload: SiteConfigFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIG.replace(
			':siteId',
			siteId
		);
		return HttpClientService.patch(url, {
			data: {
				type: 'sites',
				attributes: {
					configs: {
						isHidden: payload.isHidden
					}
				}
			}
		});
	};

	/**
	 * update site robot config
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteRobotConfigUpdate = (siteId: string, payload: SiteRobotConfigFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.CONFIG.replace(
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
	 * fetch site notification types
	 * @returns
	 */
	siteNotificationTypesFetch = () => {
		return HttpClientService.get<SiteNotificationTypesAxiosGetInterface>(
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.NOTIFICATION.TYPES
		);
	};

	/**
	 * fetch site notification users
	 * @param siteId
	 * @returns
	 */
	siteNotificationUsersFetch = (siteId: string) => {
		return HttpClientService.get<SiteNotificationUsersAxiosGetInterface>(
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.NOTIFICATION.USERS,
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
			? AppConfigService.AppServices.SCREENS.BUSINESS.SITES.NOTIFICATION.USERS
			: AppConfigService.AppServices.SCREENS.BUSINESS.SITES.NOTIFICATION.USER.replace(
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
	 * fetch site service positions
	 * @param siteId
	 * @returns
	 */
	siteServicePositionsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SERVICE_POSITIONS.replace(
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SERVICE_POSITIONS;
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SERVICE_POSITIONS;
		return HttpClientService.delete(`${url}/${servicePositionId}`);
	};

	/**
	 * generate reports
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteReportsGenerate = (siteId: string, payload: ReportFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.REPORTS.PRODUCTS;
		return HttpClientService.get<string>(url, {
			params: {
				'filter[site]': siteId,
				'filter[createdAt][gte]': payload.from,
				'filter[createdAt][lte]': payload.to
			}
		});
	};
}
const instance = new SitesService();
export default instance;
