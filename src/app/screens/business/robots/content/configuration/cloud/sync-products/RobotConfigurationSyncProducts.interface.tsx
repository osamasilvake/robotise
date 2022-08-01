import { SliceRobotOperationsInterface } from '../../../../../../../slices/business/robots/RobotOperations.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigurationSyncProductsInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotOperations: SliceRobotOperationsInterface;
}
