import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
}

export interface RobotConfigPayloadInterface {
	name: string;
	customerName: string;
}
