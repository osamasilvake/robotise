import { Box, Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat2 } from '../../../../../../utilities/methods/Moment';
import { RobotDetailLocationInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';
import RobotDetailLocationCard from './RobotDetailLocationCard';
import RobotDetailLocationInfo from './RobotDetailLocationInfo';

const RobotDetailLocation: FC<RobotDetailLocationInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailLocationStyle();

	const [grid, showGrid] = useState(false);

	const translation = 'CONTENT.DETAIL.LOCATION';

	return robotTwins.location ? (
		<Box className={classes.sLocationContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sLocationTitle}>
				{t(`${translation}.TITLE`)}
			</Typography>

			{/* Map Label */}
			{robotTwins.location.value.floor && (
				<Typography color="textPrimary">
					{t(`${translation}.FLOOR`)} {robotTwins.location.value.floor}
				</Typography>
			)}

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat2(robotTwins.location.updatedAt)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				{/* Card */}
				<RobotDetailLocationCard robotTwins={robotTwins} grid={grid} />

				{/* Info */}
				<RobotDetailLocationInfo
					location={robotTwins.location}
					grid={grid}
					showGrid={showGrid}
				/>
			</Grid>
		</Box>
	) : null;
};
export default RobotDetailLocation;
