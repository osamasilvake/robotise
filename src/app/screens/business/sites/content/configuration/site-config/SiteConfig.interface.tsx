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
	defaultOrderMode?: string;
	availableOrderModes: string[];
	orderOriginsEnabled: string[];
	customerNotificationTypesEnabled: string[];
	helpPage: string;
	showEmergencyWorkflow?: boolean;
	showPerformanceDashboard?: boolean;
	isHidden?: boolean;
}
