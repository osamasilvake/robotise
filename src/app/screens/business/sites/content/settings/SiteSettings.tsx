import { Box } from '@mui/material';
import { FC } from 'react';

import { SiteSettingsStyle } from './SiteSettings.style';

const SiteSettings: FC = () => {
	const classes = SiteSettingsStyle();

	return <Box className={classes.sBox}>Hello</Box>;
};
export default SiteSettings;
