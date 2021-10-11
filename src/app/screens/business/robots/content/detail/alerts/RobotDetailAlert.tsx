import { Box, Grid, Tooltip } from '@mui/material';
import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import { useWindow } from '../../../../../../utilities/hooks/window/UseWindow';
import RobotDetailAlertCard from './RobotDetailAlertCard';
import { RobotDetailAlertInterface } from './RobotDetailAlerts.interface';

const RobotDetailAlert: FC<RobotDetailAlertInterface> = (props) => {
	const { alert } = props;

	const cWindow = useWindow();

	const mobileScreen = AppConfigService.AppOptions.styles.responsive.mobile;
	const msMax =
		AppConfigService.AppOptions.screens.business.robots.content.detail.alert.messageSizes[1];
	const vTooltip = cWindow.innerWidth > mobileScreen && alert.message.length > msMax;

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			{vTooltip && (
				<Tooltip title={alert.message}>
					<Box>
						<RobotDetailAlertCard alert={alert} />
					</Box>
				</Tooltip>
			)}
			{!vTooltip && <RobotDetailAlertCard alert={alert} />}
		</Grid>
	);
};
export default RobotDetailAlert;
