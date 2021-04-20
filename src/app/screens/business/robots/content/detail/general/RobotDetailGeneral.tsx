import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../components/common/status/Status';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { RobotDetailGeneralInterface } from './RobotDetailGeneral.interface';
import { RobotDetailGeneralStyles } from './RobotDetailGeneral.style';

const RobotDetailGeneral: FC<RobotDetailGeneralInterface> = (props) => {
	const { robot } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailGeneralStyles();

	return (
		<Grid container spacing={1} className={classes.sGeneralContainer}>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.SITE')}
				</Typography>
				<Typography variant="body1">{robot.site.title}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.VENDOR')}
				</Typography>
				<Typography variant="body1">
					{robot.site.elevator?.vendor || t('CONTENT.DETAIL.GENERAL.UNKNOWN')}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.LAST_UPDATED')}
				</Typography>
				<Typography variant="body1">{momentFormat1(robot.updatedAt)}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={1}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralItemStatusLabel}>
					{t('CONTENT.DETAIL.GENERAL.STATUS')}
				</Typography>
				<Status active={robot.robotState.isReady.value}>
					{robot.robotState.isReady.value
						? t('CONTENT.DETAIL.GENERAL.ON')
						: t('CONTENT.DETAIL.GENERAL.OFF')}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={8} lg={3} className={classes.sGeneralLastItem}>
				<FormControlLabel
					labelPlacement="start"
					label={
						<Box>
							<Typography
								variant="caption"
								color="textSecondary"
								className={classes.sGeneralLastItemLabel}>
								{t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.LABEL')}
							</Typography>
							<Status active={!!robot.site.acceptOrders} small>
								{robot.site.acceptOrders
									? t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.ACTIVE')
									: t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS.INACTIVE')}
							</Status>
						</Box>
					}
					className={classes.sGeneralLastItemCheckboxControl}
					control={
						<Checkbox
							color="primary"
							name="acceptOrder"
							checked={robot.site.acceptOrders}
						/>
					}
				/>
			</Grid>
		</Grid>
	);
};
export default RobotDetailGeneral;
