import { Box } from '@mui/material';
import { FC } from 'react';

import { SiteConfigurationStyle } from './SiteConfiguration.style';
import SiteConfigurationTabs from './SiteConfiguration.tabs';

const SiteConfiguration: FC = () => {
	const classes = SiteConfigurationStyle();

	return (
		<Box className={classes.sBox}>
			{/* Content */}
			<SiteConfigurationTabs />
		</Box>
	);
};
export default SiteConfiguration;
