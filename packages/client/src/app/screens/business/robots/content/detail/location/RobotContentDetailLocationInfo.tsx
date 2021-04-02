import { Box, Checkbox, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotContentDetailLocationInfoInterface } from './RobotContentDetailLocation.interface';
import { RobotContentDetailLocationStyles } from './RobotContentDetailLocation.style';

const RobotContentDetailLocationInfo: FC<RobotContentDetailLocationInfoInterface> = (props) => {
	const { location, grid, showGrid } = props;
	const { t } = useTranslation('ROBOTS');
	const robotContentDetailLocationClasses = RobotContentDetailLocationStyles();

	/**
	 * toggle grid lines
	 */
	const toggleGridLines = () => {
		showGrid(!grid);
	};

	return location ? (
		<Grid item xs={12} sm={6}>
			<Box>
				<Typography
					variant="body2"
					color="textSecondary"
					className={robotContentDetailLocationClasses.sLocationInfoLabel}>
					{t('CONTENT.DETAIL.LOCATION.GRID')}:
				</Typography>
				<Checkbox
					name="acceptOrder"
					color="primary"
					checked={grid}
					onChange={toggleGridLines}
				/>
			</Box>
			<Box>
				<Typography
					variant="body2"
					color="textSecondary"
					className={robotContentDetailLocationClasses.sLocationInfoLabel}>
					id:
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
					variant="body2"
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
					variant="body2"
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
					variant="body2"
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
