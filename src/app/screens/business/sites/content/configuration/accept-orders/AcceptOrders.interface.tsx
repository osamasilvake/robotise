import { SliceSiteInterface } from '../../../../../../slices/business/sites/Site.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface AcceptOrdersInterface {
	sites: SliceSitesInterface;
	site: SliceSiteInterface;
}
