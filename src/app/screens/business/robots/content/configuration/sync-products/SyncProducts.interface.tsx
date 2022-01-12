import { SliceRobotOperationsInterface } from '../../../../../../slices/business/robots/RobotOperations.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface SyncProductsInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotOperations: SliceRobotOperationsInterface;
}
