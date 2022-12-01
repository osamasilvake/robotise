import {
	StatusTypeEnum,
	StatusTypeTextEnum
} from '../../../../../../../components/common/status/Status.enum';
import { PCCDataInterface } from '../../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice.interface';
import { SitePhoneCallsTableColumnHistoryEventTypeEnum } from './SitePhoneCallsTable.enum';

/**
 * map phone call
 * @param phoneCall
 * @returns
 */
export const mapPhoneCall = (phoneCall: PCCDataInterface) => {
	const translation = 'COMMON.PHONE_CALLS.LIST.TABLE.VALUES';
	return {
		...phoneCall,
		status: `${translation}.STATUS.${phoneCall.status}`
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
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.APPROVED:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.CONFIRMED:
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.COMPLETED:
			return StatusTypeEnum.SUCCESS_DARK;
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.BUSY:
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.MISSING_FROM:
			return StatusTypeEnum.WARN;
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.REJECTED:
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.ERROR:
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.FAILED:
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.NO_ANSWER:
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.UNDEFINED:
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
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.APPROVED:
			return {
				color: StatusTypeTextEnum.SUCCESS_LIGHT,
				icon: 'approval'
			};
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.CONFIRMED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'shopping_cart'
			};
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.REJECTED:
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.ERROR:
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
