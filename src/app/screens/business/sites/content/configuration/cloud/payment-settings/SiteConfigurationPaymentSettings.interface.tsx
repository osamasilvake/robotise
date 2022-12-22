import { SliceSiteCloudConfigurationInterface } from '../../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice.interface';
import { SliceSitesInterface } from '../../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteConfigurationPaymentSettingsInterface {
	sites: SliceSitesInterface;
	siteCloudConfiguration: SliceSiteCloudConfigurationInterface;
}

export interface SiteConfigurationPaymentSettingsFormInterface {
	enabled?: boolean;
	accountId: string;
	liveMode?: boolean;
	defaultPreAuthorizedAmount: string | number;
}
