import { SliceSiteInterface } from '../../../../../../slices/sites/Site.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/sites/Sites.slice.interface';

export interface AcceptOrdersInterface {
	sites: SliceSitesInterface;
	site: SliceSiteInterface;
}
