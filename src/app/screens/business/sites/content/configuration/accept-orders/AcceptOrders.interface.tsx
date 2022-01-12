import { SliceOperationsSiteInterface } from '../../../../../../slices/business/sites/SiteOperations.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface AcceptOrdersInterface {
	sites: SliceSitesInterface;
	siteOperations: SliceOperationsSiteInterface;
}
