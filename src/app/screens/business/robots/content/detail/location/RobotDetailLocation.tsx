import { Box, Grid, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat3 } from '../../../../../../utilities/methods/Moment';
import { strRemoveLastUnderscore } from '../../../../../../utilities/methods/StringUtilities';
import { RobotDetailLocationInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyles } from './RobotDetailLocation.style';
import RobotDetailLocationCard from './RobotDetailLocationCard';
import RobotDetailLocationInfo from './RobotDetailLocationInfo';

const RobotDetailLocation: FC<RobotDetailLocationInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailLocationStyles();

	const [grid, showGrid] = useState(false);

	return robotTwins.location ? (
		<Box className={classes.sLocationContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sLocationTitle}>
				{t('CONTENT.DETAIL.LOCATION.TITLE')}
			</Typography>

			{/* Label */}
			<Typography variant="body1" color="textPrimary">
				{strRemoveLastUnderscore(robotTwins.location.value.mapName)}
				{robotTwins.location.value.floor && ` / ${robotTwins.location.value.floor}`}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat3(robotTwins.location.updatedAt)}
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
