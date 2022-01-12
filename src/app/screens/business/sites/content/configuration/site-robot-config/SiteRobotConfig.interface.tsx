import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { SliceOperationsSiteInterface } from '../../../../../../slices/business/sites/SiteOperations.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteRobotConfigInterface {
	sites: SliceSitesInterface;
	siteOperations: SliceOperationsSiteInterface;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
}

export interface SiteRobotConfigFormInterface {
	robotId: string;
}
