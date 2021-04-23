import { Box, Grid, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat3 } from '../../../../../../utilities/methods/Moment';
import {
	strRemoveLastUnderscore,
	strRemoveSymbols
} from '../../../../../../utilities/methods/StringUtilities';
import { RobotDetailLocationInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyles } from './RobotDetailLocation.style';
import RobotDetailLocationCard from './RobotDetailLocationCard';
import RobotDetailLocationInfo from './RobotDetailLocationInfo';

const RobotDetailLocation: FC<RobotDetailLocationInterface> = (props) => {
	const { robotTwin } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailLocationStyles();

	const [grid, showGrid] = useState(true);

	return robotTwin.location ? (
		<Box className={classes.sLocationContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sLocationTitle}>
				{t('CONTENT.DETAIL.LOCATION.TITLE')}
			</Typography>

			{/* Label */}
			<Typography variant="body1" color="textPrimary">
				{strRemoveSymbols(strRemoveLastUnderscore(robotTwin.location.value.map.id))}
				{robotTwin.location.value.map.floor && ` / ${robotTwin.location.value.map.floor}`}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat3(robotTwin.location.updatedAt)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				{/* Card */}
				<RobotDetailLocationCard robotTwin={robotTwin} grid={grid} />

				{/* Info */}
				<RobotDetailLocationInfo
					location={robotTwin.location}
					grid={grid}
					showGrid={showGrid}
				/>
			</Grid>
		</Box>
	) : null;
};
export default RobotDetailLocation;
