import { SliceSiteOperationsInterface } from '../../../../../../slices/business/sites/SiteOperations.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteConfigInterface {
	sites: SliceSitesInterface;
	siteOperations: SliceSiteOperationsInterface;
}

export interface SiteConfigFormInterface {
	title: string;
	timezone: string;
	currency: string;
	helpPage: string;
	isHidden?: boolean;
	availableOrderModes: string[];
	defaultOrderMode?: string;
}
