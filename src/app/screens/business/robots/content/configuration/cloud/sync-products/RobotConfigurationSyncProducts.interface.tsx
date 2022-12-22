import { SliceRobotCloudConfigurationInterface } from '../../../../../../../slices/business/robots/configuration/cloud/RobotCloudConfiguration.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigurationSyncProductsInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotCloudConfiguration: SliceRobotCloudConfigurationInterface;
}
