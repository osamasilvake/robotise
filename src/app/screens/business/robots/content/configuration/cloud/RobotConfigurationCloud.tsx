import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { robotOperationsSelector } from '../../../../../../slices/business/robots/RobotOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import RobotConfigurationEmergency from './emergency/RobotConfigurationEmergency';
import RobotConfig from './robot-config/RobotConfig';
import RobotSiteConfig from './robot-site-config/RobotSiteConfig';
import { RobotConfigurationCloudStyle } from './RobotConfigurationCloud.style';
import RobotConfigurationSyncProducts from './sync-products/RobotConfigurationSyncProducts';

const RobotConfigurationCloud: FC = () => {
	const classes = RobotConfigurationCloudStyle();

	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotOperations = useSelector(robotOperationsSelector);

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<RobotConfigurationEmergency
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>

				<Grid item xs={12}>
					<RobotConfigurationSyncProducts
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
export default RobotConfigurationCloud;
