import { AppConfigService, HttpClientService } from '../../../services';

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
}
const instance = new SitesService();
export default instance;
