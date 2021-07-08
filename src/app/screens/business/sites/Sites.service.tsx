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
	 * @param payload
	 * @param type
	 * @param siteId
	 * @param productId
	 * @returns
	 */
	siteProductCreateEdit = (
		payload: DialogCreateEditProductPayloadInterface,
		type: SiteProductCreateEditTypeEnum,
		siteId: string,
		productId: string | undefined
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
	siteUpdateRoomState = (siteId: string, whitelist: string[]) => {
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
	siteAcceptOrders = (siteId: string, acceptOrders: boolean) => {
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
	siteUpdateNotification = (payload: DialogCreateEditNotificationPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.SITES.NOTIFICATION.USER.replace(
			':userId',
			payload.userId || ''
		);
		return HttpClientService.patch(url, {
			data: {
				attributes: {
					isActive: payload.isActive,
					users: payload.users?.map((email) => ({ email }))
				}
			}
		});
	};
}
const instance = new SitesService();
export default instance;
