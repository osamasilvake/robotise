import { ReportFormInterface } from '../../../components/common/report/Report.interface';
import { AppConfigService, HttpClientService } from '../../../services';
import { dateDaysPriorToToday } from '../../../utilities/methods/Date';
import { RobotOrderModeTypeEnum } from '../robots/content/orders/list/actions/RobotOrdersActions.enum';
import { GeneralAllElevatorCallsListPayloadInterface } from './all-elevator-calls/list/GeneralAllElevatorCallsList.interface';
import { GeneralAllElevatorCallsTableColumnStatusTypeEnum } from './all-elevator-calls/list/table/GeneralAllElevatorCallsTable.enum';
import { GeneralAllOrdersPeriodTypeEnum } from './all-orders/list/actions/GeneralAllOrdersActions.enum';
import { GeneralAllOrdersListPayloadInterface } from './all-orders/list/GeneralAllOrdersList.interface';
import { GeneralAllOrdersTableColumnStatusTypeEnum } from './all-orders/list/table/GeneralAllOrdersTable.enum';
import { GeneralAllPhoneCallsListPayloadInterface } from './all-phone-calls/list/GeneralAllPhoneCallsList.interface';
import { GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum } from './all-phone-calls/list/table/GeneralAllPhoneCallsTable.enum';
import { GeneralAllSMSListPayloadInterface } from './all-sms-list/list/GeneralAllSMSList.interface';
import { GeneralAllSMSListTableColumnHistoryEventTypeEnum } from './all-sms-list/list/table/GeneralAllSMSListTable.enum';
import { GeneralEmailsListPayloadInterface } from './emails/list/GeneralEmailsList.interface';
import { GeneralEmailsTableColumnHistoryEventTypeEnum } from './emails/list/table/GeneralEmailsTable.enum';
import {
	GeneralAllElevatorCallsAxiosGetInterface,
	GeneralAllOrderAxiosGetInterface,
	GeneralAllOrdersAxiosGetInterface,
	GeneralAllPhoneCallsAxiosGetInterface,
	GeneralAllSMSListAxiosGetInterface,
	GeneralEmailAxiosGetInterface,
	GeneralEmailsAxiosGetInterface,
	GeneralOrderModesAxiosGetInterface,
	GeneralProductCategoriesAxiosGetInterface
} from './General.interface';

class GeneralService {
	/**
	 * fetch emails
	 * @param payload
	 * @returns
	 */
	generalEmailsFetch = (payload: GeneralEmailsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.EMAILS;
		const delivered = GeneralEmailsTableColumnHistoryEventTypeEnum.DELIVERED;

		return HttpClientService.get<GeneralEmailsAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId,
				'filter[status][ne]': !payload.delivered ? delivered : undefined,
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

		const nSite = '51392f2f-dcd8-4be7-894d-fc47f3361a52,01994f33-d1e9-4e54-8a96-c5fef6c5fb14';
		const finished = GeneralAllOrdersTableColumnStatusTypeEnum.FINISHED;
		const marketingRide = RobotOrderModeTypeEnum.MARKETING_RIDE;
		const coldCall = RobotOrderModeTypeEnum.COLD_CALL;

		const status = payload.includeAllOrders ? undefined : finished;
		const mode = payload.includeAllOrders ? undefined : `${coldCall},${marketingRide}`;

		return HttpClientService.get<GeneralAllOrdersAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[site][nin]': payload.includeAllOrders ? undefined : nSite,
				'filter[createdAt][gte]': date,
				'filter[status][ne]': status,
				'filter[mode][nin]': mode,
				'filter[isDebug]': false,
				'filter[withLocationName]': true,
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
		return HttpClientService.get<GeneralAllOrderAxiosGetInterface>(url, {
			params: { 'filter[withLocationName]': true }
		});
	};

	/**
	 * fetch all elevator calls
	 * @param payload
	 * @returns
	 */
	generalAllElevatorCallsFetch = (payload: GeneralAllElevatorCallsListPayloadInterface) => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.ALL_ELEVATOR_CALLS;
		const failed = GeneralAllElevatorCallsTableColumnStatusTypeEnum.FAILED;

		return HttpClientService.get<GeneralAllElevatorCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[callType]': payload.callType || undefined,
				'filter[vendor]': payload.vendor || undefined,
				'filter[isDebug]': payload.includeAllCalls ? undefined : false,
				'filter[e2eStatus]': payload.includeAllCalls ? undefined : failed,
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
		const rejected = GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.REJECTED;
		const error = GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.ERROR;

		return HttpClientService.get<GeneralAllPhoneCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[status][in]': payload.includeAllCalls ? undefined : `${rejected},${error}`,
				'filter[withLocationName]': true,
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
		const completed = GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.COMPLETED;

		return HttpClientService.get<GeneralAllPhoneCallsAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[status][nin]': payload.includeAllCalls ? undefined : completed,
				'filter[withLocationName]': true,
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
		const rejected = GeneralAllSMSListTableColumnHistoryEventTypeEnum.REJECTED;
		const error = GeneralAllSMSListTableColumnHistoryEventTypeEnum.ERROR;

		return HttpClientService.get<GeneralAllSMSListAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[status][in]': payload.includeAllCalls ? undefined : `${rejected},${error}`,
				'filter[withLocationName]': true,
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
		const delivered = GeneralAllSMSListTableColumnHistoryEventTypeEnum.DELIVERED;

		return HttpClientService.get<GeneralAllSMSListAxiosGetInterface>(url, {
			params: {
				'filter[site]': payload.siteId || undefined,
				'filter[status][nin]': payload.includeAllCalls ? undefined : delivered,
				'filter[withLocationName]': true,
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
	 * fetch product categories
	 * @returns
	 */
	generalProductCategoriesFetch = () => {
		const url = AppConfigService.AppServices.SCREENS.BUSINESS.GENERAL.PRODUCT_CATEGORIES;
		return HttpClientService.get<GeneralProductCategoriesAxiosGetInterface>(url);
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
