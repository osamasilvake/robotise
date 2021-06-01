import { Grid, Link, Tooltip, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Status from '../../../../../../components/common/status/Status';
import { TriggerMessageTypeEnum } from '../../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../../components/frame/message/Message.interface';
import { GeneralTriggerMessage } from '../../../../../../slices/general/General.slice';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { RobotDetailGeneralInterface } from './RobotDetailGeneral.interface';
import { RobotDetailGeneralStyles } from './RobotDetailGeneral.style';

const RobotDetailGeneral: FC<RobotDetailGeneralInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation(['ROBOTS', 'TOOLTIPS']);
	const classes = RobotDetailGeneralStyles();

	const dispatch = useDispatch();

	/**
	 * copy to clipboard
	 * @param id
	 * @returns
	 */
	const handleCopyToClipboard = (id: string) => () => {
		// copy message
		navigator.clipboard.writeText(id);

		// dispatch: trigger message
		const message: TriggerMessageInterface = {
			id,
			show: true,
			severity: TriggerMessageTypeEnum.SUCCESS,
			text: 'ROBOTS.DETAIL.ALERTS.CLIPBOARD'
		};
		dispatch(GeneralTriggerMessage(message));
	};

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.ROBOT')}
				</Typography>
				<Typography variant="body1">
					<Tooltip placement="bottom" title={String(t('TOOLTIPS:COPY_CLIPBOARD'))}>
						<Link
							onClick={handleCopyToClipboard(robotTwins.robot.id)}
							className={classes.sLink}>
							{robotTwins.robot.name}
						</Link>
					</Tooltip>
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.SITE')}
				</Typography>
				<Typography variant="body1">{robotTwins.site.title}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.VENDOR')}
				</Typography>
				<Typography variant="body1">
					{robotTwins.site.elevator?.vendor || t('CONTENT.DETAIL.GENERAL.UNKNOWN')}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.LAST_UPDATED')}
				</Typography>
				<Typography variant="body1">{momentFormat1(robotTwins.updatedAt)}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={1}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralItemStatusLabel}>
					{t('CONTENT.DETAIL.GENERAL.STATUS')}
				</Typography>
				<Status active={robotTwins.robotState.isReady.value}>
					{robotTwins.robotState.isReady.value
						? t('CONTENT.DETAIL.GENERAL.ON')
						: t('CONTENT.DETAIL.GENERAL.OFF')}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2} className={classes.sGeneralLastItem}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralLastItemLabel}>
					{t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.LABEL')}
				</Typography>
				<Status active={!!robotTwins.site.acceptOrders}>
					{robotTwins.site.acceptOrders
						? t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.ACTIVE')
						: t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.INACTIVE')}
				</Status>
			</Grid>
		</Grid>
	);
};
export default RobotDetailGeneral;
