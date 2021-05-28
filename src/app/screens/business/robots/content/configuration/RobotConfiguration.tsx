import { Box, Grid, Paper } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { robotSelector } from '../../../../../slices/robot/Robot.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { RobotConfigurationStyles } from './RobotConfiguration.style';
import RobotConfigurationSyncProducts from './sync-products/RobotConfigurationSyncProducts';

const RobotConfiguration: FC = () => {
	const classes = RobotConfigurationStyles();

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robot = useSelector(robotSelector);

	return (
		<Box className={classes.sBox}>
			<Grid container>
				<Grid item xs={12} sm={6} md={4} lg={3} component={Paper} elevation={2} square>
					<RobotConfigurationSyncProducts
						robotTwinsSummary={robotTwinsSummary}
						robot={robot}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotConfiguration;
