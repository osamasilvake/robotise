import { Card, CardContent, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import { isMobileDevice } from '../../../../../../utilities/methods/MobileUtilities';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { CardStyles } from '../../../../../../utilities/styles/Card.style';
import { RobotContentDetailAlertsTypeEnum } from './RobotContentDetailAlerts.enum';
import { RobotContentDetailAlertCardInterface } from './RobotContentDetailAlerts.interface';
import { RobotContentDetailAlertsStyles } from './RobotContentDetailAlerts.style';

const RobotContentDetailAlertCard: FC<RobotContentDetailAlertCardInterface> = (props) => {
	const { alert } = props;

	const cardClasses = CardStyles();
	const robotContentDetailAlertsClasses = RobotContentDetailAlertsStyles();

	const msNormal = AppConfigService.AppOptions.screens.robots.content.info.alert.messageSizes[0];
	const msMax = AppConfigService.AppOptions.screens.robots.content.info.alert.messageSizes[1];

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
		<Card variant="elevation" square elevation={1}>
			<CardContent
				className={clsx(
					cardClasses.sCardContent1,
					robotContentDetailAlertsClasses.sCardContent,
					{
						[robotContentDetailAlertsClasses.sCardDanger]:
							alert.level === RobotContentDetailAlertsTypeEnum.DANGER,
						[robotContentDetailAlertsClasses.sCardWarning]:
							alert.level === RobotContentDetailAlertsTypeEnum.WARNING,
						[robotContentDetailAlertsClasses.sCardOther]: !(
							alert.level === RobotContentDetailAlertsTypeEnum.DANGER ||
							alert.level === RobotContentDetailAlertsTypeEnum.WARNING
						)
					}
				)}>
				{/* Date */}
				<Typography variant="body2" color="inherit">
					{momentFormat1(alert.createdAt)}
				</Typography>

				{/* Message */}
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
	);
};
export default RobotContentDetailAlertCard;
