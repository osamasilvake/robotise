import {
	StatusTypeEnum,
	StatusTypeTextEnum
} from '../../../../../../components/common/status/Status.enum';
import { ASLDataInterface } from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice.interface';
import { GeneralAllSMSListTableColumnHistoryEventTypeEnum } from './GeneralAllSMSListTable.enum';

/**
 * map SMS item
 * @param smsItem
 * @returns
 */
export const mapSMSItem = (smsItem: ASLDataInterface) => {
	const translation = 'COMMON.SMS_LIST.LIST.TABLE.VALUES';
	return {
		...smsItem,
		status: `${translation}.STATUS.${smsItem.status}`,
		history: smsItem.history.map((item) => ({
			...item,
			event: `${translation}.HISTORY.EVENT.${item.event}`
		}))
	};
};

/**
 * map status
 * @param status
 * @returns
 */
export const mapStatus = (status: string) => {
	const value = status && status.split('.').pop();
	switch (value) {
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.DELIVERED:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.RECEIVED:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.CONFIRMED:
			return StatusTypeEnum.SUCCESS_DARK;
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.SENT:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.RECEIVING:
			return StatusTypeEnum.WARN;
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.FAILED:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.UNDELIVERED:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.REJECTED:
			return StatusTypeEnum.ERROR;
		default:
			return StatusTypeEnum.INFO;
	}
};

/**
 * map history event type
 * @param event
 * @returns
 */
export const mapHistoryEventType = (event: string) => {
	switch (event) {
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.RECEIVED:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.DELIVERED:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.CONFIRMED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'shopping_cart'
			};
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.FAILED:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.UNDELIVERED:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.REJECTED_ACCEPT_ORDER_FALSE:
		case GeneralAllSMSListTableColumnHistoryEventTypeEnum.REJECTED_NOT_IN_WHITELIST:
			return {
				color: StatusTypeTextEnum.ERROR,
				icon: 'cancel_outlined'
			};
		default:
			return {
				color: StatusTypeTextEnum.INFO,
				icon: 'info_outlined'
			};
	}
};
