import { SliceRobotInterface } from '../../../../../../slices/robots/Robot.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/robots/RobotTwinsSummary.slice.interface';

export interface SyncProductsInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robot: SliceRobotInterface;
}
