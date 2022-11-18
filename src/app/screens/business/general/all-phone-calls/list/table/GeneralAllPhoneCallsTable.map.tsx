import {
	StatusTypeEnum,
	StatusTypeTextEnum
} from '../../../../../../components/common/status/Status.enum';
import { APCDataInterface } from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.interface';
import { GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum } from './GeneralAllPhoneCallsTable.enum';

/**
 * map phone call
 * @param phoneCall
 * @returns
 */
export const mapPhoneCall = (phoneCall: APCDataInterface) => {
	const translation = 'COMMON.PHONE_CALLS.LIST.TABLE.VALUES';
	return {
		...phoneCall,
		status: `${translation}.STATUS.${phoneCall.status}`,
		history: phoneCall.history.map((item) => ({
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
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.APPROVED:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.CONFIRMED:
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.COMPLETED:
			return StatusTypeEnum.SUCCESS_DARK;
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.BUSY:
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.MISSING_FROM:
			return StatusTypeEnum.WARN;
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.REJECTED:
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.ERROR:
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.FAILED:
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.NO_ANSWER:
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.UNDEFINED:
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
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.APPROVED:
			return {
				color: StatusTypeTextEnum.SUCCESS_LIGHT,
				icon: 'approval'
			};
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.CONFIRMED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'shopping_cart'
			};
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.REJECTED:
		case GeneralAllPhoneCallsTableColumnHistoryEventTypeEnum.ERROR:
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
