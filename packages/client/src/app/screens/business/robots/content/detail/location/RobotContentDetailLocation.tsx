import { Box, Grid, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat2 } from '../../../../../../utilities/methods/Moment';
import {
	strRemoveLastUnderscore,
	strRemoveSymbols
} from '../../../../../../utilities/methods/StringUtilities';
import { RobotContentDetailLocationInterface } from './RobotContentDetailLocation.interface';
import { RobotContentDetailLocationStyles } from './RobotContentDetailLocation.style';
import RobotContentDetailLocationCard from './RobotContentDetailLocationCard';
import RobotContentDetailLocationInfo from './RobotContentDetailLocationInfo';

const RobotContentDetailLocation: FC<RobotContentDetailLocationInterface> = (props) => {
	const { robot } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotContentDetailLocationStyles();

	const [grid, showGrid] = useState(true);

	return robot.location ? (
		<Box className={classes.sLocationContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sLocationTitle}>
				{t('CONTENT.DETAIL.LOCATION.TITLE')}
			</Typography>

			{/* Label */}
			<Typography variant="body1" color="textPrimary">
				{strRemoveSymbols(strRemoveLastUnderscore(robot.location.value.map.id))}
				{robot.location.value.map.floor && ` / ${robot.location.value.map.floor}`}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat2(robot.location.updatedAt)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				{/* Card */}
				<RobotContentDetailLocationCard robot={robot} grid={grid} />

				{/* Info */}
				<RobotContentDetailLocationInfo
					location={robot.location}
					grid={grid}
					showGrid={showGrid}
				/>
			</Grid>
		</Box>
	) : null;
};
export default RobotContentDetailLocation;
