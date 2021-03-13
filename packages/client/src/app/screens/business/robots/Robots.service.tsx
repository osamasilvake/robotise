import { AppConfigService, HttpClientService } from '../../../services';

class RobotsService {
	/**
	 * fetch robots
	 */
	robotsFetch = () => {
		return HttpClientService.get(AppConfigService.AppServices.ROBOTS.LIST);
	};

	/**
	 * fetch robot twins
	 */
	robotTwinsFetch = () => {
		return HttpClientService.get(AppConfigService.AppServices.ROBOT_TWINS.LIST);
	};
}
const instance = new RobotsService();
export default instance;
