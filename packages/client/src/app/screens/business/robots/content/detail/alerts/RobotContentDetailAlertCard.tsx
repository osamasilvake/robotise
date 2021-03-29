import { Box, Card, CardContent, Icon, Tooltip, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { TriggerMessageTypeEnum } from '../../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../../components/frame/message/Message.interface';
import { AppConfigService } from '../../../../../../services';
import { GeneralTriggerMessage } from '../../../../../../slices/general/General.slice';
import { isMobileDevice } from '../../../../../../utilities/methods/MobileUtilities';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { CardStyles } from '../../../../../../utilities/styles/Card.style';
import { RobotContentDetailAlertsTypeEnum } from './RobotContentDetailAlerts.enum';
import { RobotContentDetailAlertCardInterface } from './RobotContentDetailAlerts.interface';
import { RobotContentDetailAlertsStyles } from './RobotContentDetailAlerts.style';

const RobotContentDetailAlertCard: FC<RobotContentDetailAlertCardInterface> = (props) => {
	const { alert } = props;

	const { t } = useTranslation(['MESSAGE', 'TOOLTIPS']);
	const cardClasses = CardStyles();
	const robotContentDetailAlertsClasses = RobotContentDetailAlertsStyles();

	const dispatch = useDispatch();

	const msNormal = AppConfigService.AppOptions.screens.robots.content.info.alert.messageSizes[0];
	const msMax = AppConfigService.AppOptions.screens.robots.content.info.alert.messageSizes[1];

	/**
	 * copy to clipboard
	 * @param text
	 */
	const handleCopyToClipboard = (text: string) => () => {
		// copy message
		navigator.clipboard.writeText(text);

		// dispatch: trigger message
		const message: TriggerMessageInterface = {
			show: true,
			severity: TriggerMessageTypeEnum.SUCCESS,
			text: t('ROBOT.ALERTS.CLIPBOARD')
		};
		dispatch(GeneralTriggerMessage(message));
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
				{/* Icon */}
				<Box className={robotContentDetailAlertsClasses.sCardContentIcons}>
					<Icon
						onClick={handleCopyToClipboard(alert.message)}
						className={robotContentDetailAlertsClasses.sCardContentIcon}>
						<Tooltip title={String(t('TOOLTIPS:MESSAGE_CLIPBOARD'))} placement="top">
							<AssignmentIcon />
						</Tooltip>
					</Icon>
					<Icon className={robotContentDetailAlertsClasses.sCardContentIcon}>
						<Tooltip title={String(t('TOOLTIPS:NEW_TAB'))} placement="top">
							<OpenInNewIcon />
						</Tooltip>
					</Icon>
				</Box>

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
