import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { robotOperationsSelector } from '../../../../../../slices/business/robots/RobotOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import RobotConfigurationEmergency from './emergency/RobotConfigurationEmergency';
import RobotConfig from './robot-config/RobotConfig';
import { RobotConfigurationCloudStyle } from './RobotConfigurationCloud.style';
import RobotConfigurationSyncConfigs from './sync-configs/RobotConfigurationSyncConfigs';
import RobotConfigurationSyncProducts from './sync-products/RobotConfigurationSyncProducts';

const RobotConfigurationCloud: FC = () => {
	const classes = RobotConfigurationCloudStyle();

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotOperations = useSelector(robotOperationsSelector);

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1}>
				{/* Emergency */}
				<Grid item xs={12}>
					<RobotConfigurationEmergency
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>

				{/* Sync Products */}
				<Grid item xs={12}>
					<RobotConfigurationSyncProducts
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>

				{/* Robot Config */}
				<Grid item xs={12}>
					<RobotConfig
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>

				{/* Sync Configs */}
				<Grid item xs={12}>
					<RobotConfigurationSyncConfigs />
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotConfigurationCloud;
