import { AppConfigService, HttpClientService } from '../../../services';
import { momentDaysPriorToToday } from '../../../utilities/methods/Moment';
import { GeneralEmailsListPayloadInterface } from './emails/list/GeneralEmailsList.interface';
import { GeneralEmailAxiosGetInterface, GeneralEmailsAxiosGetInterface } from './General.interface';

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
				'page[size]': payload.rowsPerPage,
				'filter[createdAt][gte]': momentDaysPriorToToday(7)
			}
		});
	};

	/**
	 * fetch email
	 * @param emailId
	 * @returns
	 */
	generalEmailFetch = (emailId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.EMAIL.replace(
			':emailId',
			emailId
		);
		return HttpClientService.get<GeneralEmailAxiosGetInterface>(url);
	};
}
const instance = new GeneralService();
export default instance;
