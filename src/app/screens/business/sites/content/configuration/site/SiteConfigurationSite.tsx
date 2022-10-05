import { Box } from '@mui/material';
import { FC } from 'react';

import { SiteConfigurationSiteInterface } from './SiteConfigurationSite.interface';
import { SiteConfigurationSiteStyle } from './SiteConfigurationSite.style';
import SiteConfigurationSiteSection from './SiteConfigurationSiteSection';

const SiteConfigurationSite: FC<SiteConfigurationSiteInterface> = (props) => {
	const { section } = props;
	const classes = SiteConfigurationSiteStyle();

	return (
		<Box className={classes.sBox}>
			<SiteConfigurationSiteSection section={section} />
		</Box>
	);
};
export default SiteConfigurationSite;
