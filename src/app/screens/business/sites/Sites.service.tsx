import { AppConfigService, HttpClientService } from '../../../services';
import { SiteProductCreateEditTypeEnum } from './content/products/list/table/SiteProductsTable.enum';
import { DialogCreateEditProductPayloadInterface } from './content/products/list/table/SiteProductsTable.interface';

class SitesService {
	/**
	 * fetch sites
	 */
	sitesFetch = () => {
		return HttpClientService.get(AppConfigService.AppServices.SITE.ALL);
	};

	/**
	 * fetch site
	 * @param siteId
	 * @returns
	 */
	siteFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SITE.SINGLE.replace(':siteId', siteId);
		return HttpClientService.get(url);
	};

	/**
	 * fetch service positions
	 * @param siteId
	 * @returns
	 */
	siteServicePositionsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SITE.SERVICE_POSITIONS.replace(':siteId', siteId);
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
		const url = AppConfigService.AppServices.SITE.PRODUCTS;
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
		const url = AppConfigService.AppServices.SITE.PRODUCTS;
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
		const url = AppConfigService.AppServices.SITE.PRODUCTS;
		return HttpClientService.delete(`${url}/${productId}`);
	};

	/**
	 * accept orders
	 * @param siteId
	 * @param acceptOrders
	 * @returns
	 */
	siteAcceptOrders = (siteId: string, acceptOrders: boolean) => {
		const url = AppConfigService.AppServices.SITE.SINGLE.replace(':siteId', siteId);
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
}
const instance = new SitesService();
export default instance;
