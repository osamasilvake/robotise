import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import { RobotDetailLocationInfoInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';

const RobotDetailLocationInfo: FC<RobotDetailLocationInfoInterface> = (props) => {
	const { location, grid, showGrid } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailLocationStyle();

	return location ? (
		<Grid item xs={12} sm={6}>
			<Box className={classes.sInfoGridBox}>
				<Typography variant="body2" color="textSecondary" className={classes.sInfoLabel}>
					{t('CONTENT.DETAIL.LOCATION.GRID')}:
				</Typography>
				<Checkbox
					className={classes.sInfoCheckbox}
					color="primary"
					name="gridLines"
					checked={grid}
					onChange={() => showGrid(!grid)}
				/>
			</Box>
			<Box>
				<Typography variant="body2" color="textSecondary" className={classes.sInfoLabel}>
					id:
				</Typography>
				<Typography variant="subtitle1" color="textPrimary" className={classes.sInfoValue}>
					{location.value.mapName || AppConfigService.AppOptions.common.none}
				</Typography>
			</Box>
			<Box>
				<Typography variant="body2" color="textSecondary" className={classes.sInfoLabel}>
					x:
				</Typography>
				<Typography variant="subtitle1" color="textPrimary" className={classes.sInfoValue}>
					{location.value.x.toFixed(2)}
				</Typography>
			</Box>
			<Box>
				<Typography variant="body2" color="textSecondary" className={classes.sInfoLabel}>
					y:
				</Typography>
				<Typography variant="subtitle1" color="textPrimary" className={classes.sInfoValue}>
					{location.value.y.toFixed(2)}
				</Typography>
			</Box>
			<Box>
				<Typography variant="body2" color="textSecondary" className={classes.sInfoLabel}>
					yaw:
				</Typography>
				<Typography variant="subtitle1" color="textPrimary" className={classes.sInfoValue}>
					{location.value.yaw.toFixed(2)}
				</Typography>
			</Box>
		</Grid>
	) : null;
};
export default RobotDetailLocationInfo;
