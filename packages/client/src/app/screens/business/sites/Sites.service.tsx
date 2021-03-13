import { AppConfigService, HttpClientService } from '../../../services';

class SitesService {
	/**
	 * fetch sites
	 */
	sitesFetch = () => {
		return HttpClientService.get(AppConfigService.AppServices.SITES.LIST);
	};
}
const instance = new SitesService();
export default instance;
