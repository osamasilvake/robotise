import { Box, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat2 } from '../../../../../../utilities/methods/Moment';
import { RobotDetailSafetyInterface } from './RobotDetailSafety.interface';
import { RobotDetailSafetyStyle } from './RobotDetailSafety.style';
import RobotDetailSafetySensors from './RobotDetailSensors';
import RobotDetailSafetySystems from './RobotDetailSystems';

const RobotDetailSafety: FC<RobotDetailSafetyInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailSafetyStyle();

	return (
		<Box className={classes.sStateContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.DETAIL.SAFETY.TITLE')}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat2(
					robotTwins.safetySystemsState?.updatedAt ||
						robotTwins.safetySensorsState?.updatedAt
				)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1} className={classes.sGridContainer}>
				<Grid item xs={12} md={6}>
					<RobotDetailSafetySystems systems={robotTwins.safetySystemsState} />
				</Grid>
				<Grid item xs={12} md={6}>
					<RobotDetailSafetySensors sensors={robotTwins.safetySensorsState} />
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotDetailSafety;
