import { SliceSiteCloudConfigurationInterface } from '../../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice.interface';
import { SliceSitesInterface } from '../../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteConfigInterface {
	sites: SliceSitesInterface;
	siteCloudConfiguration: SliceSiteCloudConfigurationInterface;
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
	buildingId?: string;
	vendor?: string;
	showEmergencyWorkflow?: boolean;
	showPerformanceDashboard?: boolean;
	showMarketingRides?: boolean;
	showColdCalls?: boolean;
	isHidden?: boolean;
}
