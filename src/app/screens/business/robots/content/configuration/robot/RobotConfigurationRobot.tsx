import { Box, Grid } from '@mui/material';
import { FC } from 'react';

import { RobotConfigurationRobotStyle } from './RobotConfigurationRobot.style';

const RobotConfigurationRobot: FC = () => {
	const classes = RobotConfigurationRobotStyle();

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					Start
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotConfigurationRobot;
