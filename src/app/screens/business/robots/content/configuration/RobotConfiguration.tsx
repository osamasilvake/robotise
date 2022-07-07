import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { robotOperationsSelector } from '../../../../../slices/business/robots/RobotOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import RobotEmergency from './emergency/RobotEmergency';
import RobotConfig from './robot-config/RobotConfig';
import RobotSiteConfig from './robot-site-config/RobotSiteConfig';
import { RobotConfigurationStyle } from './RobotConfiguration.style';
import RobotSyncProducts from './sync-products/RobotSyncProducts';

const RobotConfiguration: FC = () => {
	const classes = RobotConfigurationStyle();

	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotOperations = useSelector(robotOperationsSelector);

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<RobotEmergency
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>

				<Grid item xs={12}>
					<RobotSyncProducts
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>

				<Grid item xs={12}>
					<RobotConfig
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>

				{sites.content && (
					<Grid item xs={12}>
						<RobotSiteConfig
							sites={sites}
							robotTwinsSummary={robotTwinsSummary}
							robotOperations={robotOperations}
						/>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};
export default RobotConfiguration;
