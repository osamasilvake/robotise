import { SliceRobotInterface } from '../../../../../../slices/robots/Robot.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robot: SliceRobotInterface;
}

export interface RobotConfigPayloadInterface {
	name: string;
	customerName: string;
	isHidden?: boolean;
	isOnlineCheckDisabled?: boolean;
}
