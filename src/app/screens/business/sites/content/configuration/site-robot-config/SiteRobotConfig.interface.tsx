import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { SliceSiteInterface } from '../../../../../../slices/business/sites/Site.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteRobotConfigInterface {
	sites: SliceSitesInterface;
	site: SliceSiteInterface;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
}

export interface SiteRobotConfigFormInterface {
	robotId: string;
}
