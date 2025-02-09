import {
	StatusTypeEnum,
	StatusTypeTextEnum
} from '../../../../../../components/common/status/Status.enum';
import { AppConfigService } from '../../../../../../services';
import { SECDataInterface } from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { GeneralEmailsTableColumnHistoryEventTypeEnum } from './GeneralEmailsTable.enum';

/**
 * map email
 * @param email
 * @returns
 */
export const mapEmail = (email: SECDataInterface) => {
	const translation = 'CONTENT.EMAILS.LIST.TABLE.VALUES';
	const none = AppConfigService.AppOptions.common.none;
	return {
		...email,
		content: email.content !== undefined ? email.content : none,
		notificationCode:
			email.notificationCode !== undefined
				? `${translation}.NOTIFICATION_CODE.${email.notificationCode}`
				: none,
		history: email.history.map((item) => ({
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
		case GeneralEmailsTableColumnHistoryEventTypeEnum.PROCESSED:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case GeneralEmailsTableColumnHistoryEventTypeEnum.DELIVERED:
			return StatusTypeEnum.SUCCESS_DARK;
		case GeneralEmailsTableColumnHistoryEventTypeEnum.BOUNCE:
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
		case GeneralEmailsTableColumnHistoryEventTypeEnum.PROCESSED:
			return {
				color: StatusTypeTextEnum.SUCCESS_LIGHT,
				icon: 'cached_outlined'
			};
		case GeneralEmailsTableColumnHistoryEventTypeEnum.DELIVERED:
			return {
				color: StatusTypeTextEnum.SUCCESS_DARK,
				icon: 'check_outlined'
			};
		case GeneralEmailsTableColumnHistoryEventTypeEnum.BOUNCE:
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
