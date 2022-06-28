import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotInventoryTableStatusTypeEnum } from './RobotInventoryTable.enum';
/**
 * map status
 * @param status
 * @returns
 */
export const mapStatus = (status: string) => {
	switch (status) {
		case RobotInventoryTableStatusTypeEnum.HIGH:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotInventoryTableStatusTypeEnum.LOW:
		case RobotInventoryTableStatusTypeEnum.MEDIUM:
			return StatusTypeEnum.WARN;
		case RobotInventoryTableStatusTypeEnum.EMPTY:
		default:
			return StatusTypeEnum.ERROR;
	}
};
