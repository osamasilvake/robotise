import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { robotSelector } from '../../../../../slices/business/robots/Robot.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import RobotConfig from './robot-config/RobotConfig';
import RobotSiteConfig from './robot-site-config/RobotSiteConfig';
import { RobotConfigurationStyle } from './RobotConfiguration.style';
import SyncProducts from './sync-products/SyncProducts';

const RobotConfiguration: FC = () => {
	const classes = RobotConfigurationStyle();

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robot = useSelector(robotSelector);

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1} className={classes.sGridMarginBottom}>
				<Grid item xs={12} md={3}>
					<SyncProducts robotTwinsSummary={robotTwinsSummary} robot={robot} />
				</Grid>
			</Grid>

			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<RobotConfig robotTwinsSummary={robotTwinsSummary} robot={robot} />
				</Grid>
				<Grid item xs={12} md={6}>
					<RobotSiteConfig robotTwinsSummary={robotTwinsSummary} robot={robot} />
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotConfiguration;
