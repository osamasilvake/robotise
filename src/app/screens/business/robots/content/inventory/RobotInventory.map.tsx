import { StatusTypeEnum } from '../../../../../components/common/status/Status.enum';
import { RobotInventoryStatusTypeEnum } from './RobotInventory.enum';
/**
 * map status level
 * @param status
 * @returns
 */
export const mapStatusLevel = (status: string) => {
	switch (status) {
		case RobotInventoryStatusTypeEnum.HIGH:
			return StatusTypeEnum.SUCCESS;
		case RobotInventoryStatusTypeEnum.MEDIUM:
			return StatusTypeEnum.WARN;
		case RobotInventoryStatusTypeEnum.LOW:
		default:
			return StatusTypeEnum.ERROR;
	}
};
