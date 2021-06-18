import { AppConfigService, HttpClientService } from '../../../services';

class ChangelogService {
	/**
	 * fetch changelog
	 */
	changelogFetch = () => {
		return HttpClientService.get(AppConfigService.AppServices.SCREENS.INFORMATION.CHANGE_LOG);
	};
}
const instance = new ChangelogService();
export default instance;
