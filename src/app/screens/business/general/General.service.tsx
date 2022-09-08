import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { AppConfigService, HttpClientService } from '../../../services';
import { dateDaysPriorToToday } from '../../../utilities/methods/Date';
import { GeneralAllOrdersPeriodTypeEnum } from './all-orders/list/actions/GeneralAllOrdersActions.enum';
import { GeneralAllOrdersListPayloadInterface } from './all-orders/list/GeneralAllOrdersList.interface';
import { GeneralEmailsListPayloadInterface } from './emails/list/GeneralEmailsList.interface';
import {
	GeneralAllOrderAxiosGetInterface,
	GeneralAllOrdersAxiosGetInterface,
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
	 * fetch all orders
	 * @param payload
	 * @returns
	 */
	generalAllOrdersFetch = (payload: GeneralAllOrdersListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS.FETCH;

		const isPeriod24Hr = payload.period === GeneralAllOrdersPeriodTypeEnum.HR24;
		const date = isPeriod24Hr ? dateDaysPriorToToday(1) : dateDaysPriorToToday(7);

		return HttpClientService.get<GeneralAllOrdersAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[createdAt][gte]': date,
				'filter[status][ne]': payload.includeAllOrders ? undefined : 'finished',
				'filter[isDebug]': false,
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * fetch order
	 * @param orderId
	 * @returns
	 */
	generalAllOrderFetch = (orderId: string) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.ROBOTS.ORDERS.SINGLE.replace(
			':orderId',
			orderId
		);
		return HttpClientService.get<GeneralAllOrderAxiosGetInterface>(url);
	};

	/**
	 * fetch order modes
	 * @returns
	 */
	generalOrderModesFetch = () => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ORDER_MODES;
		return HttpClientService.get<GeneralOrderModesAxiosGetInterface>(url);
	};

	/**
	 * generate reports
	 * @param id
	 * @param idType
	 * @param payload
	 * @returns
	 */
	generalReportsGenerate = (id: string, idType: string, payload: ReportFormInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.REPORTS;
		return HttpClientService.get<string>(`${url}/${payload.id}`, {
			params: {
				[`filter[${idType}]`]: id,
				'filter[createdAt][gte]': payload.from,
				'filter[createdAt][lte]': payload.to
			}
		});
	};
}
const instance = new GeneralService();
export default instance;
