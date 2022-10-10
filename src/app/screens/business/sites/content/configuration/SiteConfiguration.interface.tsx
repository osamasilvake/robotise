import { Dispatch, SetStateAction } from 'react';

import { SCContentDataInterface } from '../../../../../slices/business/sites/configuration/site-configuration/SiteConfiguration.slice.interface';

export interface SiteConfigurationTabsInterface {
	sections: SCContentDataInterface[];
}

export interface DialogSiteConfigurationConfirmationInterface {
	open: number;
	setOpen: Dispatch<SetStateAction<number>>;
	setFormDirty: Dispatch<SetStateAction<boolean>>;
}
