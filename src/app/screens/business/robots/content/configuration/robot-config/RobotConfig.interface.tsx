import { SliceRobotInterface } from '../../../../../../slices/business/robots/Robot.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robot: SliceRobotInterface;
}

export interface RobotConfigFormInterface {
	name: string;
	customerName: string;
	isHidden?: boolean;
	isOnlineCheckDisabled?: boolean;
}
