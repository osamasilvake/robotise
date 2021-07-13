import { Box, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { robotSelector } from '../../../../../slices/robots/Robot.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robots/RobotTwinsSummary.slice';
import { RobotConfigurationStyle } from './RobotConfiguration.style';
import SyncProducts from './sync-products/SyncProducts';

const RobotConfiguration: FC = () => {
	const classes = RobotConfigurationStyle();

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robot = useSelector(robotSelector);

	return (
		<Box className={classes.sBox}>
			<Grid container>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<SyncProducts robotTwinsSummary={robotTwinsSummary} robot={robot} />
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotConfiguration;
