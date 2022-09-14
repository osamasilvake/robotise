import { SliceSiteOperationsInterface } from '../../../../../../slices/business/sites/SiteOperations.slice.interface';
import { SliceSitesInterface } from '../../../../../../slices/business/sites/Sites.slice.interface';

export interface SiteConfigurationPaymentSettingsInterface {
	sites: SliceSitesInterface;
	siteOperations: SliceSiteOperationsInterface;
}

export interface SiteConfigurationPaymentSettingsFormInterface {
	enabled?: boolean;
	accountId: string;
	liveMode?: boolean;
	defaultPreAuthorizedAmount: string | number;
}
