import { AppConfigService, HttpClientService } from '../../../services';
import { DeepLinksAxiosGetInterface } from './DeepLinks.interface';
import { DeepLinksListPayloadInterface } from './list/DeepLinksList.interface';

class DeepLinksService {
	/**
	 * fetch deep links
	 * @param payload
	 * @returns
	 */
	deepLinksFetch = (payload: DeepLinksListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.DEEP_LINKS;
		return HttpClientService.get<DeepLinksAxiosGetInterface>(url, {
			params: {
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};
}
const instance = new DeepLinksService();
export default instance;
