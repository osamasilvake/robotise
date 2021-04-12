import { AppConfigService, HttpClientService } from '../../../services';

class SitesService {
	/**
	 * fetch sites
	 */
	sitesFetch = () => {
		return HttpClientService.get(AppConfigService.AppServices.SITE.ALL);
	};

	/**
	 * fetch products
	 * @param siteId
	 * @returns
	 */
	siteProductsFetch = (siteId: string) => {
		const url = AppConfigService.AppServices.SITE.PRODUCTS;
		return HttpClientService.get(`${url}?filter[site]=${siteId}`);
	};
}
const instance = new SitesService();
export default instance;
