import {
	HistoryStatusTypeEnum,
	StatusTypeEnum
} from '../../../../../../../components/common/status/Status.enum';
import { PCCDataInterface } from '../../../../../../../slices/business/sites/phone-calls/PhoneCalls.slice.interface';
import { SitePhoneCallsTableColumnHistoryEventTypeEnum } from './SitePhoneCallsTable.enum';

/**
 * map phone call
 * @param phoneCall
 * @returns
 */
export const mapPhoneCall = (phoneCall: PCCDataInterface) => {
	const translation = 'CONTENT.PHONE_CALLS.LIST.TABLE.VALUES';
	return {
		...phoneCall,
		status: `${translation}.STATUS.${phoneCall.status}`,
		mode: `${translation}.MODE.${phoneCall.mode}`,
		workflow: `${translation}.WORKFLOW.ITEMS.${phoneCall.workflow}`,
		history: phoneCall.history.map((item) => ({
			...item,
			event: `${translation}.HISTORY.EVENT.${item.event}`
		})),
		notes: {
			workflow: `${translation}.WORKFLOW.NOTES.${phoneCall.workflow}`
		}
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
			return StatusTypeEnum.SUCCESS_DARK;
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.REJECTED:
			return StatusTypeEnum.ERROR;
		default:
			return StatusTypeEnum.INFO;
	}
};

/**
 * map history event type
 * @param status
 * @returns
 */
export const mapHistoryEventType = (event: string) => {
	switch (event) {
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.APPROVED:
			return {
				color: HistoryStatusTypeEnum.SUCCESS_LIGHT,
				icon: 'approval'
			};
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.CONFIRMED:
			return {
				color: HistoryStatusTypeEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.ORDER_ASSIGNED:
			return {
				color: HistoryStatusTypeEnum.SUCCESS_DARK,
				icon: 'shopping_cart'
			};
		case SitePhoneCallsTableColumnHistoryEventTypeEnum.REJECTED:
			return {
				color: HistoryStatusTypeEnum.ERROR,
				icon: 'cancel_outlined'
			};
		default:
			return {
				color: HistoryStatusTypeEnum.INFO,
				icon: 'info_outlined'
			};
	}
};
