import { CopyAll, OpenInNew } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { TriggerMessageTypeEnum } from '../../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../../components/frame/message/Message.interface';
import { AppConfigService } from '../../../../../../services';
import { GeneralTriggerMessage } from '../../../../../../slices/general/General.slice';
import { useWindow } from '../../../../../../utilities/hooks/window/UseWindow';
import { dateFormat2 } from '../../../../../../utilities/methods/Date';
import { RobotDetailAlertsTypeEnum } from './RobotDetailAlerts.enum';
import { RobotDetailAlertCardInterface } from './RobotDetailAlerts.interface';
import { RobotDetailAlertsStyle } from './RobotDetailAlerts.style';

const RobotDetailAlertCard: FC<RobotDetailAlertCardInterface> = (props) => {
	const { alert } = props;
	const { t } = useTranslation('TOOLTIP');
	const classes = RobotDetailAlertsStyle();

	const dispatch = useDispatch();

	const cWindow = useWindow();

	const mobileScreen = AppConfigService.AppOptions.styles.responsive.mobile;
	const msNormal =
		AppConfigService.AppOptions.screens.business.robots.content.detail.alert.messageSizes[0];
	const msMax =
		AppConfigService.AppOptions.screens.business.robots.content.detail.alert.messageSizes[1];

	/**
	 * copy to clipboard
	 * @param code
	 * @param text
	 * @returns
	 */
	const handleCopyToClipboard = (code: string, text: string) => () => {
		// copy message
		navigator.clipboard.writeText(text);

		// dispatch: trigger message
		const message: TriggerMessageInterface = {
			id: code,
			show: true,
			severity: TriggerMessageTypeEnum.SUCCESS,
			text: 'COMMON.COPY_TO_CLIPBOARD'
		};
		dispatch(GeneralTriggerMessage(message));
	};

	/**
	 * show alert docs detail
	 * @param code
	 * @returns
	 */
	const handleShowAlertDocsDetail = (code: string) => () => {
		const link = `${AppConfigService.AppOptions.common.alertDocsUrl}#${code}`;
		window.open(link);
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
				className={clsx(classes.sCardContent, {
					[classes.sCardDanger]: alert.level === RobotDetailAlertsTypeEnum.DANGER,
					[classes.sCardWarning]: alert.level === RobotDetailAlertsTypeEnum.WARNING
				})}>
				{/* Icon */}
				<Box className={classes.sCardContentIcons}>
					<Tooltip
						placement="top"
						title={t<string>('ALERTS.COPY_CLIPBOARD')}
						onClick={handleCopyToClipboard(alert.code, alert.message)}>
						<IconButton color="inherit">
							<CopyAll fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip
						placement="top"
						title={t<string>('ALERTS.DOCS_LINK')}
						onClick={handleShowAlertDocsDetail(alert.code)}>
						<IconButton color="inherit">
							<OpenInNew fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>

				{/* Date */}
				<Typography variant="body2">{dateFormat2(alert.createdAt)}</Typography>

				{/* Message */}
				<Typography
					variant={adjustAlertMessageSize(alert.message)}
					className={classes.sCardContentMessage}>
					{cWindow.innerWidth > mobileScreen && alert.message.length > msMax
						? `${alert.message.substring(0, msMax)} ...`
						: alert.message}
				</Typography>
			</CardContent>
		</Card>
	);
};
export default RobotDetailAlertCard;
