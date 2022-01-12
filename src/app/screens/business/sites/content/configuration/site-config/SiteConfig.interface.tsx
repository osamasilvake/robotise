import { SliceOperationsSiteInterface } from '../../../../../../slices/business/sites/SiteOperations.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteConfigInterface {
	sites: SliceSitesInterface;
	siteOperations: SliceOperationsSiteInterface;
}

export interface SiteConfigFormInterface {
	isHidden?: boolean;
}
