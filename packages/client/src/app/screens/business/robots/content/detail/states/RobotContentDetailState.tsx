import { Box, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import RobotContentDetailStateCard from './RobotContentDetailStateCard';
import { RobotContentDetailStateInterface } from './RobotContentDetailStates.interface';
import { mapRobotStates } from './RobotContentDetailStates.map';
import { RobotContentDetailStatesStyles } from './RobotContentDetailStates.style';

const RobotContentDetailState: FC<RobotContentDetailStateInterface> = (props) => {
	const { robot, state } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotContentDetailStatesStyles();

	return state && state.content ? (
		<Box className={classes.sStateContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sStateTitle}>
				{t(state.title)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				{Object.keys(state.content).map((item) => {
					const mappedResult = mapRobotStates(`${state.type}.${item}`, robot);
					return (
						mappedResult && (
							<Grid key={item} item xs={12} sm={6} md={4} lg={3}>
								<RobotContentDetailStateCard
									icon={mappedResult?.icon}
									title={t(mappedResult.title)}
									value={t(mappedResult.value)}
									date={mappedResult.date}
								/>
							</Grid>
						)
					);
				})}
			</Grid>
		</Box>
	) : null;
};
export default RobotContentDetailState;
