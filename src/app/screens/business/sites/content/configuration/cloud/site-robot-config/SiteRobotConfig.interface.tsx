import {
	RTSContentDataInterface,
	SliceRobotTwinsSummaryInterface
} from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { SliceSiteOperationsInterface } from '../../../../../../../slices/business/sites/SiteOperations.slice.interface';
import { SliceSitesInterface } from '../../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteRobotConfigInterface {
	sites: SliceSitesInterface;
	siteOperations: SliceSiteOperationsInterface;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
}

export interface SiteRobotConfigFormInterface {
	robot: RTSContentDataInterface | null | undefined;
}
