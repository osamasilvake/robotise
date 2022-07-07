import { AppConfigService, HttpClientService } from '../../../../../services';
import { dateDayJs } from '../../../../../utilities/methods/Date';
import {
	PerformancePurchasesAxiosGetInterface,
	PerformancePurchasesPayloadInterface
} from './SitePerformance.interface';

class PerformanceService {
	/**
	 * fetch purchases
	 * @param payload
	 * @returns
	 */
	performancePurchasesFetch = (payload: PerformancePurchasesPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.PURCHASES;
		const fetchFrom = dateDayJs().subtract(payload.from, 'days').format('YYYY-MM-DD');

		return HttpClientService.get<PerformancePurchasesAxiosGetInterface>(url, {
			params: {
				'filter[isDebug]': false,
				'filter[createdAt][gte]': fetchFrom
			}
		});
	};
}
const instance = new PerformanceService();
export default instance;
