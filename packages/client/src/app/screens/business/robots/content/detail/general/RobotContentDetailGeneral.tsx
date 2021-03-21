import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { RobotContentDetailGeneralInterface } from '../RobotContentDetail.interface';
import { robotContentDetailGeneralStyles } from './RobotContentDetailGeneral.style';

const RobotContentDetailGeneral: FC<RobotContentDetailGeneralInterface> = (props) => {
	const { content } = props;
	const robotContentDetailGeneralClasses = robotContentDetailGeneralStyles();

	return (
		<Grid container spacing={2} className={robotContentDetailGeneralClasses.sGridContainer}>
			<Grid item xs={12} sm={6} md={3}>
				<Typography variant="caption" color="textSecondary">
					Site
				</Typography>
				<Typography variant="body1">{content?.data[22].site.title}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={2}>
				<Typography variant="caption" color="textSecondary">
					Vendor
				</Typography>
				<Typography variant="body1">
					{content?.data[22].site.elevator?.vendor || 'Unknown'}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<Typography variant="caption" color="textSecondary">
					Last Updated
				</Typography>
				<Typography variant="body1">
					{momentFormat1(content?.data[22].updatedAt)}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={1}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={robotContentDetailGeneralClasses.sGridItemStatusCaption}>
					Status
				</Typography>
				<Typography
					variant="subtitle2"
					className={clsx(robotContentDetailGeneralClasses.sGridItemStatus, {
						[robotContentDetailGeneralClasses.sGridItemStatusOn]:
							content?.data[21].robotState.isReady.value,
						[robotContentDetailGeneralClasses.sGridItemStatusOff]: !content?.data[21]
							.robotState.isReady.value
					})}>
					{content?.data[21].robotState.isReady.value ? 'ON' : 'OFF'}
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
					label="Accept Orders"
					className={robotContentDetailGeneralClasses.sGridLastItemCheckboxControl}
					control={
						<Checkbox
							name="acceptOrder"
							color="primary"
							checked={content?.data[22].site.acceptOrders}
						/>
					}
				/>
			</Grid>
		</Grid>
	);
};
export default RobotContentDetailGeneral;
