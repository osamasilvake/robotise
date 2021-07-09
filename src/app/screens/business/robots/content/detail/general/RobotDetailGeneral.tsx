import { Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { RobotDetailControlModeTypeEnum } from '../commands/RobotDetailCommands.enum';
import { RobotDetailGeneralInterface } from './RobotDetailGeneral.interface';
import { RobotDetailGeneralStyle } from './RobotDetailGeneral.style';

const RobotDetailGeneral: FC<RobotDetailGeneralInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation(['ROBOTS', 'TOOLTIPS']);
	const classes = RobotDetailGeneralStyle();

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={4} lg={3}>
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
					{robotTwins.site.elevator?.vendor || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.LAST_UPDATED')}
				</Typography>
				<Typography variant="body1">{momentFormat1(robotTwins.updatedAt)}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralItemStatusLabel}>
					{t('CONTENT.DETAIL.GENERAL.STATUS.LABEL')}
				</Typography>
				<Status active={robotTwins.robotState.isReady.value}>
					{robotTwins.robotState.isReady.value
						? t('CONTENT.DETAIL.GENERAL.STATUS.ON')
						: t('CONTENT.DETAIL.GENERAL.STATUS.OFF')}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralItemStatusLabel}>
					{t('CONTENT.DETAIL.GENERAL.CONTROL_MODE')}
				</Typography>
				<Status
					active={
						robotTwins.controlMode.value === RobotDetailControlModeTypeEnum.AUTONOMOUS
					}>
					{robotTwins.controlMode.value}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={1} className={classes.sGeneralLastItem}>
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
