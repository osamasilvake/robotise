import { SliceRobotInterface } from '../../../../../../slices/robots/Robot.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigurationSyncProductsInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robot: SliceRobotInterface;
}
