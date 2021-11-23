import { SliceSiteInterface } from '../../../../../../slices/business/sites/Site.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteConfigInterface {
	sites: SliceSitesInterface;
	site: SliceSiteInterface;
}

export interface SiteConfigFormInterface {
	isHidden?: boolean;
}
