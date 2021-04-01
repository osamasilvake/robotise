import { Box, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';

import { RobotContentDetailLocationInfoInterface } from './RobotContentDetailLocation.interface';
import { RobotContentDetailLocationStyles } from './RobotContentDetailLocation.style';

const RobotContentDetailLocationInfo: FC<RobotContentDetailLocationInfoInterface> = (props) => {
	const { location } = props;
	const robotContentDetailLocationClasses = RobotContentDetailLocationStyles();

	return location ? (
		<Grid item xs={12} sm={6}>
			<Box>
				<Typography
					variant="body1"
					color="textSecondary"
					className={robotContentDetailLocationClasses.sLocationInfoLabel}>
					Map:
				</Typography>
				<Typography
					variant="subtitle1"
					color="textPrimary"
					className={robotContentDetailLocationClasses.sLocationInfoValue}>
					{location.value.map.id}
				</Typography>
			</Box>
			<Box>
				<Typography
					variant="body1"
					color="textSecondary"
					className={robotContentDetailLocationClasses.sLocationInfoLabel}>
					x:
				</Typography>
				<Typography
					variant="subtitle1"
					color="textPrimary"
					className={robotContentDetailLocationClasses.sLocationInfoValue}>
					{location.value.point.x.toFixed(2)}
				</Typography>
			</Box>
			<Box>
				<Typography
					variant="body1"
					color="textSecondary"
					className={robotContentDetailLocationClasses.sLocationInfoLabel}>
					y:
				</Typography>
				<Typography
					variant="subtitle1"
					color="textPrimary"
					className={robotContentDetailLocationClasses.sLocationInfoValue}>
					{location.value.point.y.toFixed(2)}
				</Typography>
			</Box>
			<Box>
				<Typography
					variant="body1"
					color="textSecondary"
					className={robotContentDetailLocationClasses.sLocationInfoLabel}>
					yaw:
				</Typography>
				<Typography
					variant="subtitle1"
					color="textPrimary"
					className={robotContentDetailLocationClasses.sLocationInfoValue}>
					{location.value.point.yaw.toFixed(2)}
				</Typography>
			</Box>
		</Grid>
	) : null;
};
export default RobotContentDetailLocationInfo;
