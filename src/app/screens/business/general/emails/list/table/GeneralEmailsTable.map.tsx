import { StatusTypeTextEnum } from '../../../../../../components/common/status/Status.enum';
import { SECDataInterface } from '../../../../../../slices/business/general/emails/Emails.slice.interface';
import { GeneralEmailsTableColumnHistoryEventTypeEnum } from './GeneralEmailsTable.enum';

/**
 * map email
 * @param email
 * @returns
 */
export const mapEmail = (email: SECDataInterface) => {
	const translation = 'EMAILS.LIST.TABLE.VALUES';
	return {
		...email,
		history: email.history.map((item) => ({
			...item,
			event: `${translation}.HISTORY.EVENT.${item.event}`
		}))
	};
};

/**
 * map history event type
 * @param status
 * @returns
 */
export const mapHistoryEventType = (event: string) => {
	switch (event) {
		case GeneralEmailsTableColumnHistoryEventTypeEnum.ERROR:
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
