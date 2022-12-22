import { SliceSiteCloudConfigurationInterface } from '../../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice.interface';
import { SliceSitesInterface } from '../../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteConfigurationAcceptOrdersInterface {
	sites: SliceSitesInterface;
	siteCloudConfiguration: SliceSiteCloudConfigurationInterface;
}
