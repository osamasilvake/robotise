import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';

import Tooltip from '../../../../../../components/common/tooltip/Tooltip';
import { AppConfigService } from '../../../../../../services';
import { CardStyles } from '../../../../../../utilities/styles/Card.style';
import RobotDetailAlertCard from './RobotDetailAlertCard';
import { RobotDetailAlertInterface } from './RobotDetailAlerts.interface';

const RobotDetailAlert: FC<RobotDetailAlertInterface> = (props) => {
	const { alert } = props;
	const cardClasses = CardStyles();

	const msMax = AppConfigService.AppOptions.screens.robots.content.detail.alert.messageSizes[1];

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Tooltip
				hideTitleOnMobile
				title={
					alert.message.length > msMax ? (
						<Card square elevation={1}>
							<CardContent>
								<Typography
									variant="body2"
									color="inherit"
									className={cardClasses.sCardContent2}>
									{alert.message}
								</Typography>
							</CardContent>
						</Card>
					) : (
						false
					)
				}>
				<Box>
					<RobotDetailAlertCard alert={alert} />
				</Box>
			</Tooltip>
		</Grid>
	);
};
export default RobotDetailAlert;
