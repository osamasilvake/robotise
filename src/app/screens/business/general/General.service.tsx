import { AppConfigService, HttpClientService } from '../../../services';
import { dateDaysPriorToToday } from '../../../utilities/methods/Date';
import { GeneralEmailsListPayloadInterface } from './emails/list/GeneralEmailsList.interface';
import {
	GeneralEmailAxiosGetInterface,
	GeneralEmailsAxiosGetInterface,
	GeneralOrderModesAxiosGetInterface
} from './General.interface';

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
				'filter[site]': payload.siteId,
				'filter[status][ne]': !payload.delivered ? 'delivered' : undefined,
				'filter[createdAt][gte]': dateDaysPriorToToday(30),
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
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

	/**
	 * fetch order modes
	 * @returns
	 */
	generalOrderModesFetch = () => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ORDER_MODES;
		return HttpClientService.get<GeneralOrderModesAxiosGetInterface>(url);
	};
}
const instance = new GeneralService();
export default instance;
