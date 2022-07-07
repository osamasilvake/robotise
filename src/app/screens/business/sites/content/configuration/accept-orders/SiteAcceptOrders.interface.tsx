import { SliceSiteOperationsInterface } from '../../../../../../slices/business/sites/SiteOperations.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteAcceptOrdersInterface {
	sites: SliceSitesInterface;
	siteOperations: SliceSiteOperationsInterface;
}
