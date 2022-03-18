import { Box } from '@mui/material';
import { FC } from 'react';

import { SetupWifiConfigStyle } from './SetupWifiConfig.style';
import SetupWifiConfigContent from './SetupWifiConfigContent';

const SetupWifiConfig: FC = () => {
	const classes = SetupWifiConfigStyle();

	return (
		<Box className={classes.sBox}>
			<SetupWifiConfigContent />
		</Box>
	);
};
export default SetupWifiConfig;
