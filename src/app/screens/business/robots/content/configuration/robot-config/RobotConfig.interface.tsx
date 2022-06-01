import { SliceRobotOperationsInterface } from '../../../../../../slices/business/robots/RobotOperations.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotOperations: SliceRobotOperationsInterface;
}

export interface RobotConfigFormInterface {
	ceInventoryId?: string;
	name?: string;
	customerName?: string;
	username?: string;
	ipAddress?: string;
	isHidden?: boolean;
	isSimulator?: boolean;
	isOnlineCheckDisabled?: boolean;
}
