import { AppConfigService, HttpClientService } from '../../../services';

class RobotsService {
	/**
	 * fetch robot twins summary
	 * @param pageNo
	 * @param rowsPerPage
	 * @returns
	 */
	robotTwinsSummaryFetch = (pageNo?: number, rowsPerPage?: number) => {
		const url = AppConfigService.AppServices.ROBOT_TWINS.SUMMARY;
		const apiLink = !pageNo ? url : `${url}?page[number]=${pageNo}&page[size]=${rowsPerPage}`;
		return HttpClientService.get(apiLink);
	};
}
const instance = new RobotsService();
export default instance;
