import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { robotOperationsSelector } from '../../../../../slices/business/robots/RobotOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import RobotConfig from './robot-config/RobotConfig';
import RobotSiteConfig from './robot-site-config/RobotSiteConfig';
import { RobotConfigurationStyle } from './RobotConfiguration.style';
import SyncProducts from './sync-products/SyncProducts';

const RobotConfiguration: FC = () => {
	const classes = RobotConfigurationStyle();

	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotOperations = useSelector(robotOperationsSelector);

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1} className={classes.sGridMarginBottom}>
				<Grid item xs={12} md={3}>
					<SyncProducts
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<RobotConfig
						robotTwinsSummary={robotTwinsSummary}
						robotOperations={robotOperations}
					/>
				</Grid>

				{sites.content && (
					<Grid item xs={12} md={6}>
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
