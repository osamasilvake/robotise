import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import { FC } from 'react';

import { IAlert } from '../../../../../../slices/robot-twins/RobotTwins.slice.interface';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { RobotContentDetailGeneralInterface } from '../RobotContentDetail.interface';
import { RobotContentDetailAlertsTypeEnum } from './RobotContentDetailAlerts.enum';
import { robotContentDetailAlertsStyles } from './RobotContentDetailAlerts.style';

const RobotContentDetailAlerts: FC<RobotContentDetailGeneralInterface> = (props) => {
	const { content } = props;
	const robotContentDetailAlertsClasses = robotContentDetailAlertsStyles();

	/**
	 * sort by alert level
	 * @returns
	 */
	const sortByAlertLevel = (): IAlert[] => {
		return content?.data[22]
			? content.data[22].alerts.value
					.concat()
					.sort((a, b) => (a.level > b.level ? 1 : b.level > a.level ? -1 : 0))
			: [];
	};

	/**
	 * adjust alert message size
	 * @param message
	 * @returns
	 */
	const adjustAlertMessageSize = (message: string): Variant => {
		const msgLength = message.length;
		if (msgLength >= 80) {
			return 'body1';
		} else if (msgLength >= 50) {
			return 'h6';
		}
		return 'h5';
	};

	return (
		<Grid container spacing={1} className={robotContentDetailAlertsClasses.sGridContainer}>
			{sortByAlertLevel().map((alert) => (
				<Grid item xs={12} sm={6} md={3} key={alert.code}>
					<Card
						variant="elevation"
						square
						elevation={1}
						className={clsx({
							[robotContentDetailAlertsClasses.sCardDanger]:
								alert.level === RobotContentDetailAlertsTypeEnum.DANGER,
							[robotContentDetailAlertsClasses.sCardWarning]:
								alert.level === RobotContentDetailAlertsTypeEnum.WARNING,
							[robotContentDetailAlertsClasses.sCardInfo]:
								alert.level === RobotContentDetailAlertsTypeEnum.INFO
						})}>
						<CardContent className={robotContentDetailAlertsClasses.sCardContent}>
							<Typography variant="body2" color="inherit">
								{momentFormat1(alert.createdAt)}
							</Typography>
							<Typography
								variant={adjustAlertMessageSize(alert.message)}
								color="inherit"
								className={robotContentDetailAlertsClasses.sCardContentMessage}>
								{alert.message}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};
export default RobotContentDetailAlerts;
