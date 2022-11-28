import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { AppConfigService, HttpClientService } from '../../../services';
import { dateDaysPriorToToday } from '../../../utilities/methods/Date';
import { GeneralAllElevatorCallsListPayloadInterface } from './all-elevator-calls/list/GeneralAllElevatorCallsList.interface';
import { GeneralAllOrdersPeriodTypeEnum } from './all-orders/list/actions/GeneralAllOrdersActions.enum';
import { GeneralAllOrdersListPayloadInterface } from './all-orders/list/GeneralAllOrdersList.interface';
import { GeneralAllPhoneCallsListPayloadInterface } from './all-phone-calls/list/GeneralAllPhoneCallsList.interface';
import { GeneralAllSMSListPayloadInterface } from './all-sms-list/list/GeneralAllSMSList.interface';
import { GeneralEmailsListPayloadInterface } from './emails/list/GeneralEmailsList.interface';
import {
	GeneralAllElevatorCallsAxiosGetInterface,
	GeneralAllOrderAxiosGetInterface,
	GeneralAllOrdersAxiosGetInterface,
	GeneralAllPhoneCallsAxiosGetInterface,
	GeneralAllSMSListAxiosGetInterface,
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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ALL_ORDERS.FETCH;

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
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ALL_ORDERS.SINGLE.replace(
			':orderId',
			orderId
		);
		return HttpClientService.get<GeneralAllOrderAxiosGetInterface>(url);
	};

	/**
	 * fetch all elevator calls
	 * @param payload
	 * @returns
	 */
	generalAllElevatorCallsFetch = (payload: GeneralAllElevatorCallsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ALL_ELEVATOR_CALLS;
		return HttpClientService.get<GeneralAllElevatorCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[isDebug]': payload.includeAllCalls ? undefined : false,
				'filter[e2eStatus]': payload.includeAllCalls ? undefined : 'failed',
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage
			}
		});
	};

	/**
	 * fetch all phone inbound calls
	 * @param payload
	 * @returns
	 */
	generalAllPhoneCallsInboundFetch = (payload: GeneralAllPhoneCallsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ALL_PHONE_CALLS.INBOUND;
		return HttpClientService.get<GeneralAllPhoneCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[status][in]': payload.includeAllCalls ? undefined : 'rejected,error',
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage / 2
			}
		});
	};

	/**
	 * fetch all phone outbound calls
	 * @param payload
	 * @returns
	 */
	generalAllPhoneCallsOutboundFetch = (payload: GeneralAllPhoneCallsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ALL_PHONE_CALLS.OUTBOUND;
		return HttpClientService.get<GeneralAllPhoneCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[status][nin]': payload.includeAllCalls ? undefined : 'completed',
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage / 2
			}
		});
	};

	/**
	 * fetch all SMS inbound calls
	 * @param payload
	 * @returns
	 */
	generalAllSMSListInboundFetch = (payload: GeneralAllSMSListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ALL_SMS_LIST.INBOUND;
		return HttpClientService.get<GeneralAllSMSListAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[status][in]': payload.includeAllCalls ? undefined : 'rejected,error',
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage / 2
			}
		});
	};

	/**
	 * fetch all SMS outbound calls
	 * @param payload
	 * @returns
	 */
	generalAllSMSListOutboundFetch = (payload: GeneralAllSMSListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ALL_SMS_LIST.OUTBOUND;
		return HttpClientService.get<GeneralAllSMSListAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[status][nin]': payload.includeAllCalls ? undefined : 'completed',
				'page[number]': payload.page + 1,
				'page[size]': payload.rowsPerPage / 2
			}
		});
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
