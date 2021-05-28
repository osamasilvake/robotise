import { SliceRobotInterface } from '../../../../../../slices/robot/Robot.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/robot-twins/RobotTwinsSummary.slice.interface';

export interface RobotConfigurationSyncProductsInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robot: SliceRobotInterface;
}
