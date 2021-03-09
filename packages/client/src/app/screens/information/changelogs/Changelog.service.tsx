import { AppConfigService, HttpClientService } from '../../../services';

class ChangelogService {
	/**
	 * fetch changelog
	 */
	changlogFetch = () => {
		return HttpClientService.get(AppConfigService.AppServices.COMMON.CHANGELOG);
	};
}
const instance = new ChangelogService();
export default instance;
