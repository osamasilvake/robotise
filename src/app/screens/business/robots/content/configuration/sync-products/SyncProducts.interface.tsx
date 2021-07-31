import { SliceRobotInterface } from '../../../../../../slices/business/robots/Robot.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface SyncProductsInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robot: SliceRobotInterface;
}
