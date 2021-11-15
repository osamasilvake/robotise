import { AppConfigService, HttpClientService } from '../../../services';
import { GeneralEmailsListPayloadInterface } from './emails/list/GeneralEmailsList.interface';
import { GeneralEmailsAxiosGetInterface } from './General.interface';

class GeneralService {
	/**
	 * fetch emails
	 * @param payload
	 * @returns
	 */
	generalEmailsFetch = (payload: GeneralEmailsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.EMAILS;
		return HttpClientService.get<GeneralEmailsAxiosGetInterface>(url, {
			params: {
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};
}
const instance = new GeneralService();
export default instance;
