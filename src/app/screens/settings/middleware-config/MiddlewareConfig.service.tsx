import { AppConfigService, HttpClientService } from '../../../services';
import { MiddlewareConfigListPayloadInterface } from './list/MiddlewareConfigList.interface';
import { MiddlewareConfigAxiosGetInterface } from './MiddlewareConfig.interface';

class MiddlewareConfigService {
	/**
	 * fetch middleware config
	 * @param payload
	 * @returns
	 */
	middlewareConfigFetch = (payload: MiddlewareConfigListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.SETTINGS.MIDDLEWARE_CONFIG;
		return HttpClientService.get<MiddlewareConfigAxiosGetInterface>(url, {
			params: {
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};
}
const instance = new MiddlewareConfigService();
export default instance;
