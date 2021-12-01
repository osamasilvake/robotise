import { SliceRobotInterface } from '../../../../../../slices/business/robots/Robot.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface RobotSiteConfigInterface {
	sites: SliceSitesInterface;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robot: SliceRobotInterface;
}

export interface RobotSiteConfigFormInterface {
	siteId: string;
}
