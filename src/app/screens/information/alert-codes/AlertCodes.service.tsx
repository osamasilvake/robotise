import { AppConfigService, HttpClientService } from '../../../services';
import { AlertCodesListPayloadInterface } from './list/AlertCodesList.interface';

class AlertCodesService {
	/**
	 * fetch alert codes
	 * @param payload
	 * @returns
	 */
	alertCodesFetch = (payload: AlertCodesListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.INFORMATION.ALERT_CODES;
		return HttpClientService.get(url, {
			params: {
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};
}
const instance = new AlertCodesService();
export default instance;
