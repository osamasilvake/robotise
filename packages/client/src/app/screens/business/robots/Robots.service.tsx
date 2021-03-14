import { AppConfigService, HttpClientService } from '../../../services';

class RobotsService {
	/**
	 * fetch robots
	 * @param pageNo
	 * @param rowsPerPage
	 * @returns
	 */
	robotsFetch = (pageNo: number, rowsPerPage: number) => {
		const url = AppConfigService.AppServices.ROBOTS.LIST;
		const apiLink = `${url}?page[number]=${pageNo}&page[size]=${rowsPerPage}`;
		return HttpClientService.get(apiLink);
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
