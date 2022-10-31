import {
	StatusTypeEnum,
	StatusTypeTextEnum
} from '../../../../../../components/common/status/Status.enum';
import { SLCDataInterface } from '../../../../../../slices/business/sites/sms-list/SMSList.slice.interface';
import { SiteSMSListTableColumnHistoryEventTypeEnum } from './SiteSMSListTable.enum';

/**
 * map SMS item
 * @param sms
 * @returns
 */
export const mapSMSItem = (smsItem: SLCDataInterface) => {
	const translation = 'CONTENT.SMS_LIST.LIST.TABLE.VALUES';
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
		case SiteSMSListTableColumnHistoryEventTypeEnum.APPROVED:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case SiteSMSListTableColumnHistoryEventTypeEnum.CONFIRMED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.COMPLETED:
			return StatusTypeEnum.SUCCESS_DARK;
		case SiteSMSListTableColumnHistoryEventTypeEnum.BUSY:
			return StatusTypeEnum.WARN;
		case SiteSMSListTableColumnHistoryEventTypeEnum.REJECTED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.ERROR:
		case SiteSMSListTableColumnHistoryEventTypeEnum.FAILED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.NO_ANSWER:
		case SiteSMSListTableColumnHistoryEventTypeEnum.UNDEFINED:
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
		case SiteSMSListTableColumnHistoryEventTypeEnum.APPROVED:
			return {
				color: StatusTypeTextEnum.SUCCESS_LIGHT,
				icon: 'approval'
			};
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
		case SiteSMSListTableColumnHistoryEventTypeEnum.REJECTED:
		case SiteSMSListTableColumnHistoryEventTypeEnum.ERROR:
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
