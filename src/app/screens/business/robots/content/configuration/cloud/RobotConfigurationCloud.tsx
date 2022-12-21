import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { cloudConfigurationSelector } from '../../../../../../slices/business/robots/configuration/cloud/CloudConfiguration.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import RobotConfigurationEmergency from './emergency/RobotConfigurationEmergency';
import RobotConfig from './robot-config/RobotConfig';
import { RobotConfigurationCloudStyle } from './RobotConfigurationCloud.style';
import RobotConfigurationSyncConfigs from './sync-configs/RobotConfigurationSyncConfigs';
import RobotConfigurationSyncProducts from './sync-products/RobotConfigurationSyncProducts';

const RobotConfigurationCloud: FC = () => {
	const classes = RobotConfigurationCloudStyle();

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const cloudConfiguration = useSelector(cloudConfigurationSelector);

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1}>
				{/* Emergency */}
				<Grid item xs={12}>
					<RobotConfigurationEmergency
						robotTwinsSummary={robotTwinsSummary}
						cloudConfiguration={cloudConfiguration}
					/>
				</Grid>

				{/* Sync Products */}
				<Grid item xs={12}>
					<RobotConfigurationSyncProducts
						robotTwinsSummary={robotTwinsSummary}
						cloudConfiguration={cloudConfiguration}
					/>
				</Grid>

				{/* Robot Config */}
				<Grid item xs={12}>
					<RobotConfig
						robotTwinsSummary={robotTwinsSummary}
						cloudConfiguration={cloudConfiguration}
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
