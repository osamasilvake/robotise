import { Grid } from '@material-ui/core';
import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat2 } from '../../../../../../utilities/methods/Moment';
import { RobotContentDetailLocationInterface } from './RobotContentDetailLocation.interface';
import { RobotContentDetailLocationStyles } from './RobotContentDetailLocation.style';
import RobotContentDetailLocationCard from './RobotContentDetailLocationCard';
import RobotContentDetailLocationInfo from './RobotContentDetailLocationInfo';

const RobotContentDetailLocation: FC<RobotContentDetailLocationInterface> = (props) => {
	const { robot } = props;
	const { t } = useTranslation('ROBOTS');
	const robotContentDetailLocationClasses = RobotContentDetailLocationStyles();

	return robot.location ? (
		<Box className={robotContentDetailLocationClasses.sLocationContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.DETAIL.LOCATION.TITLE')}
			</Typography>

			{/* Label */}
			<Typography
				variant="body1"
				color="textPrimary"
				className={robotContentDetailLocationClasses.sLocationTitle}>
				{robot.location.value.map.id}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat2(robot.location.updatedAt)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				{/* Card */}
				<RobotContentDetailLocationCard robot={robot} />

				{/* Info */}
				<RobotContentDetailLocationInfo location={robot.location} />
			</Grid>
		</Box>
	) : null;
};
export default RobotContentDetailLocation;
