import { ReportPayloadInterface } from '../../../components/common/report/Report.interface';
import { AppConfigService, HttpClientService } from '../../../services';
import { DialogCreateEditNotificationPayloadInterface } from './content/configuration/notifications/SiteNotifications.interface';
import { SiteProductCreateEditTypeEnum } from './content/products/list/table/SiteProductsTable.enum';
import { DialogCreateEditProductPayloadInterface } from './content/products/list/table/SiteProductsTable.interface';

class SitesService {
	/**
	 * fetch sites
	 */
	sitesFetch = () => {
		return HttpClientService.get(AppConfigService.AppServices.SCREENS.BUSINESS.SITES.ALL);
	};

	/**
	 * fetch site
	 * @param siteId
	 * @returns
	 */
	siteFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SINGLE.replace(
			':siteId',
			siteId
		);
		return HttpClientService.get(url);
	};

	/**
	 * fetch service positions
	 * @param siteId
	 * @returns
	 */
	siteServicePositionsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.SERVICE_POSITIONS.replace(
			':siteId',
			siteId
		);
		return HttpClientService.get(url, {
			params: {
				'filter[site]': siteId
			}
		});
	};

	/**
	 * fetch products
	 * @param siteId
	 * @returns
	 */
	siteProductsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.PRODUCTS;
		return HttpClientService.get(url, {
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
		payload: DialogCreateEditProductPayloadInterface,
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
				attributes: payload,
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
		return HttpClientService.patch(url, {
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
	 * fetch notification types
	 * @returns
	 */
	siteNotificationTypesFetch = () => {
		return HttpClientService.get(
			AppConfigService.AppServices.SCREENS.BUSINESS.SITES.NOTIFICATION.TYPES
		);
	};

	/**
	 * fetch notification users
	 * @param siteId
	 * @returns
	 */
	siteNotificationUsersFetch = (siteId: string) => {
		return HttpClientService.get(
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
	siteNotificationUpdate = (payload: DialogCreateEditNotificationPayloadInterface) => {
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
	 * generate reports
	 * @param siteId
	 * @param payload
	 * @returns
	 */
	siteReportsGenerate = (siteId: string, payload: ReportPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.REPORTS.PRODUCTS;
		return HttpClientService.get(url, {
			params: {
				'filter[site]': siteId,
				'createdAt[gte]': payload.from,
				'createdAt[lte]': payload.to
			}
		});
	};
}
const instance = new SitesService();
export default instance;
