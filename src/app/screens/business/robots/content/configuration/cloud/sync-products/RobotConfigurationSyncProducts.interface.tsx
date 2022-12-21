import { SliceCloudConfigurationInterface } from '../../../../../../../slices/business/robots/configuration/cloud/CloudConfiguration.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

export interface RobotConfigurationSyncProductsInterface {
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	cloudConfiguration: SliceCloudConfigurationInterface;
}
