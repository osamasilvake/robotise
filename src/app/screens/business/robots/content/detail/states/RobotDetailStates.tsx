import { Box, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import RobotDetailState from './RobotDetailState';
import { RobotDetailStatesInterface } from './RobotDetailStates.interface';
import { robotStates } from './RobotDetailStates.list';
import { RobotDetailStatesStyle } from './RobotDetailStates.style';

const RobotDetailStates: FC<RobotDetailStatesInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailStatesStyle();

	return (
		<Box className={classes.sStatesContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sStateTitle}>
				{t('CONTENT.DETAIL.STATES.TITLE')}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				{robotStates(robotTwins).map((state) => (
					<RobotDetailState key={state.title} robotTwins={robotTwins} state={state} />
				))}
			</Grid>
		</Box>
	);
};
export default RobotDetailStates;
