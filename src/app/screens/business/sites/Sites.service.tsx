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
	 * @param siteId
	 * @param type
	 * @param productId
	 * @returns
	 */
	siteProductCreateEdit = (
		payload: DialogCreateEditProductPayloadInterface,
		siteId: string,
		type: SiteProductCreateEditTypeEnum,
		productId: string | undefined
	) => {
		const url = AppConfigService.AppServices.SITE.PRODUCTS;
		if (type === SiteProductCreateEditTypeEnum.EDIT) {
			return HttpClientService.patch(url, {
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
				attributes: payload
			},
			relationships: {
				site: {
					data: {
						type: 'sites',
						id: siteId
					}
				}
			}
		});
	};
}
const instance = new SitesService();
export default instance;
