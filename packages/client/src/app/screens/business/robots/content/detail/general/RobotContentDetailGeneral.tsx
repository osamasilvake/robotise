import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { RobotContentDetailGeneralInterface } from './RobotContentDetailGeneral.interface';
import { RobotContentDetailGeneralStyles } from './RobotContentDetailGeneral.style';

const RobotContentDetailGeneral: FC<RobotContentDetailGeneralInterface> = (props) => {
	const { robot } = props;

	const { t } = useTranslation('ROBOTS');
	const robotContentDetailGeneralClasses = RobotContentDetailGeneralStyles();

	return (
		<Grid container spacing={2} className={robotContentDetailGeneralClasses.sGridContainer}>
			<Grid item xs={12} sm={6} md={3}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.SITE')}
				</Typography>
				<Typography variant="body1">{robot.site.title}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={2}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.VENDOR')}
				</Typography>
				<Typography variant="body1">
					{robot.site.elevator?.vendor || t('CONTENT.DETAIL.GENERAL.UNKNOWN')}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<Typography variant="caption" color="textSecondary">
					{t('CONTENT.DETAIL.GENERAL.LAST_UPDATED')}
				</Typography>
				<Typography variant="body1">{momentFormat1(robot.updatedAt)}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={1}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={robotContentDetailGeneralClasses.sGridItemStatusCaption}>
					{t('CONTENT.DETAIL.GENERAL.STATUS')}
				</Typography>
				<Typography
					variant="subtitle2"
					className={clsx(robotContentDetailGeneralClasses.sGridItemStatus, {
						[robotContentDetailGeneralClasses.sGridItemStatusOn]:
							robot.robotState.isReady.value,
						[robotContentDetailGeneralClasses.sGridItemStatusOff]: !robot.robotState
							.isReady.value
					})}>
					{robot.robotState.isReady.value
						? t('CONTENT.DETAIL.GENERAL.ON')
						: t('CONTENT.DETAIL.GENERAL.OFF')}
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				sm={6}
				md={3}
				className={robotContentDetailGeneralClasses.sGridLastItem}>
				<FormControlLabel
					labelPlacement="start"
					label={t('CONTENT.DETAIL.GENERAL.ACCEPT_ORDERS')}
					className={robotContentDetailGeneralClasses.sGridLastItemCheckboxControl}
					control={
						<Checkbox
							name="acceptOrder"
							color="primary"
							checked={robot.site.acceptOrders}
						/>
					}
				/>
			</Grid>
		</Grid>
	);
};
export default RobotContentDetailGeneral;
