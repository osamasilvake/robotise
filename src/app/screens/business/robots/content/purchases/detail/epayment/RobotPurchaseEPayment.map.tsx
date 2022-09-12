import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotPurchaseEPaymentStatusTypeEnum } from './RobotPurchaseEPayment.enum';

/**
 * map status
 * @param isPaid
 * @param status
 * @returns
 */
export const mapStatus = (isPaid: boolean, status?: string) => {
	const translation = 'CONTENT.PURCHASES.DETAIL.E_PAYMENT';

	if (status === RobotPurchaseEPaymentStatusTypeEnum.CANCEL) {
		return `${translation}.STATUS.CANCELED`;
	} else if (isPaid) {
		return `${translation}.STATUS.PAID`;
	}
	return `${translation}.STATUS.NOT_PAID`;
};

/**
 * map status color
 * @param isPaid
 * @param status
 * @returns
 */
export const mapStatusColor = (isPaid: boolean, status?: string) => {
	if (status === RobotPurchaseEPaymentStatusTypeEnum.CANCEL) {
		return StatusTypeEnum.WARN;
	} else if (isPaid) {
		return StatusTypeEnum.SUCCESS_DARK;
	}
	return StatusTypeEnum.ERROR;
};
