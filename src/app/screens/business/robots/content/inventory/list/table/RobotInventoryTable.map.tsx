import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotInventoryTableStatusTypeEnum } from './RobotInventoryTable.enum';
/**
 * map status level
 * @param status
 * @returns
 */
export const mapStatusLevel = (status: string) => {
	switch (status) {
		case RobotInventoryTableStatusTypeEnum.HIGH:
			return StatusTypeEnum.SUCCESS_LIGHT;
		case RobotInventoryTableStatusTypeEnum.MEDIUM:
			return StatusTypeEnum.WARN;
		case RobotInventoryTableStatusTypeEnum.LOW:
		default:
			return StatusTypeEnum.ERROR;
	}
};
