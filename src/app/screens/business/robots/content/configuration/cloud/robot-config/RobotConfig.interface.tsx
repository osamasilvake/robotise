import { SliceRobotCloudConfigurationInterface } from '../../../../../../../slices/business/robots/configuration/cloud/RobotCloudConfiguration.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotCloudConfiguration: SliceRobotCloudConfigurationInterface;
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
