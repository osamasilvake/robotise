import { Box } from '@mui/material';
import { FC } from 'react';

import { RobotConfigurationStyle } from './RobotConfiguration.style';
import RobotConfigurationTabs from './RobotConfiguration.tabs';

const RobotConfiguration: FC = () => {
	const classes = RobotConfigurationStyle();

	return (
		<Box className={classes.sBox}>
			<RobotConfigurationTabs />
		</Box>
	);
};
export default RobotConfiguration;
