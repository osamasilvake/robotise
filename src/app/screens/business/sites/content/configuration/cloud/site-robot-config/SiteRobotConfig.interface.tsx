import { SliceRobotTwinsSummaryInterface } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { SliceSiteCloudConfigurationInterface } from '../../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice.interface';
import { SliceSitesInterface } from '../../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteRobotConfigInterface {
	sites: SliceSitesInterface;
	siteCloudConfiguration: SliceSiteCloudConfigurationInterface;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
}

export interface SiteRobotConfigFormInterface {
	robot: {
		siteId: string;
		robotId: string;
		robotTitle: string;
	} | null;
}
