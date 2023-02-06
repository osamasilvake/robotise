import {
	StatusTypeEnum,
	StatusTypeTextEnum
} from '../../../../../../components/common/status/Status.enum';
import { SLCDataInterface } from '../../../../../../slices/business/sites/sms-list/SMSList.slice.interface';
import { SiteSMSListTableColumnHistoryEventTypeEnum } from './SiteSMSListTable.enum';

/**
 * map SMS item
 * @param smsItem
 * @returns
 */
export const mapSMSItem = (smsItem: SLCDataInterface) => {
	const translation = 'COMMON.SMS_LIST.LIST.TABLE.VALUES';
	return {
		...smsItem,
		status: `${translation}.STATUS.${smsItem.status}`
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
		case SiteSMSListTableColumnHistoryEventTypeEnum.DELIVERED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.RECEIVED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.CONFIRMED:
			return StatusTypeEnum.SUCCESS_DARK;
		case SiteSMSListTableColumnHistoryEventTypeEnum.SENT:
		case SiteSMSListTableColumnHistoryEventTypeEnum.RECEIVING:
			return StatusTypeEnum.WARN;
		case SiteSMSListTableColumnHistoryEventTypeEnum.FAILED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.UNDELIVERED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.REJECTED:
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
		case SiteSMSListTableColumnHistoryEventTypeEnum.RECEIVED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.DELIVERED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.CONFIRMED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case SiteSMSListTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'shopping_cart'
			};
		case SiteSMSListTableColumnHistoryEventTypeEnum.FAILED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.UNDELIVERED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.REJECTED_ACCEPT_ORDER_FALSE:
		case SiteSMSListTableColumnHistoryEventTypeEnum.REJECTED_NOT_IN_WHITELIST:
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
