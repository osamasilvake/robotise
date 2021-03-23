import { Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import { FC } from 'react';

import Tooltip from '../../../../../../components/common/tooltip/Tooltip';
import { AppConfigService } from '../../../../../../services';
import { IAlert } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { isMobileDevice } from '../../../../../../utilities/methods/MobileUtilities';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { RobotContentDetailAlertsTypeEnum } from './RobotContentDetailAlerts.enum';
import { RobotContentDetailAlertsInterface } from './RobotContentDetailAlerts.interface';
import { RobotContentDetailAlertsStyles } from './RobotContentDetailAlerts.style';

const RobotContentDetailAlerts: FC<RobotContentDetailAlertsInterface> = (props) => {
	const { robot } = props;
	const robotContentDetailAlertsClasses = RobotContentDetailAlertsStyles();

	const msNormal = AppConfigService.AppOptions.screens.robots.content.info.alert.messageSizes[0];
	const msMax = AppConfigService.AppOptions.screens.robots.content.info.alert.messageSizes[1];

	/**
	 * sort by alert level
	 * @returns
	 */
	const sortByAlertLevel = (): IAlert[] => {
		return robot.alerts.value
			.concat()
			.sort((a, b) => (a.level > b.level ? 1 : b.level > a.level ? -1 : 0));
	};

	/**
	 * adjust alert message size
	 * @param message
	 * @returns
	 */
	const adjustAlertMessageSize = (message: string): Variant => {
		const msgLength = message.length;
		if (msgLength >= msMax) {
			return 'body1';
		} else if (msgLength >= msNormal) {
			return 'h6';
		}
		return 'h5';
	};

	return (
		<Grid container spacing={1} className={robotContentDetailAlertsClasses.sGridContainer}>
			{sortByAlertLevel().map((alert) => (
				<Grid item xs={12} sm={6} md={3} key={alert.code}>
					<Tooltip
						hideTitleOnMobile
						title={
							alert.message.length > msMax ? (
								<Paper square elevation={2}>
									<Typography
										variant={adjustAlertMessageSize(alert.message)}
										color="inherit"
										className={robotContentDetailAlertsClasses.sCardTooltip}>
										{alert.message}
									</Typography>
								</Paper>
							) : (
								false
							)
						}>
						<Card variant="elevation" square elevation={1}>
							<CardContent
								className={clsx(robotContentDetailAlertsClasses.sCardContent, {
									[robotContentDetailAlertsClasses.sCardDanger]:
										alert.level === RobotContentDetailAlertsTypeEnum.DANGER,
									[robotContentDetailAlertsClasses.sCardWarning]:
										alert.level === RobotContentDetailAlertsTypeEnum.WARNING,
									[robotContentDetailAlertsClasses.sCardOther]: !(
										alert.level === RobotContentDetailAlertsTypeEnum.DANGER ||
										alert.level === RobotContentDetailAlertsTypeEnum.WARNING
									)
								})}>
								<Typography variant="body2" color="inherit">
									{momentFormat1(alert.createdAt)}
								</Typography>
								<Typography
									variant={adjustAlertMessageSize(alert.message)}
									color="inherit"
									className={robotContentDetailAlertsClasses.sCardContentMessage}>
									{!isMobileDevice() && alert.message.length > msMax
										? `${alert.message.substr(0, msMax)}...`
										: alert.message}
								</Typography>
							</CardContent>
						</Card>
					</Tooltip>
				</Grid>
			))}
		</Grid>
	);
};
export default RobotContentDetailAlerts;
