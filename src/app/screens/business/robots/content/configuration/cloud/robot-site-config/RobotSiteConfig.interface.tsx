import { SliceRobotOperationsInterface } from '../../../../../../../slices/business/robots/RobotOperations.slice.interface';
import { SliceRobotTwinsSummaryInterface } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';
import { SliceSitesInterface } from '../../../../../../../slices/business/sites/Sites.slice.interface';

export interface RobotSiteConfigInterface {
	sites: SliceSitesInterface;
	robotTwinsSummary: SliceRobotTwinsSummaryInterface;
	robotOperations: SliceRobotOperationsInterface;
}

export interface RobotSiteConfigFormInterface {
	siteId: string;
}
