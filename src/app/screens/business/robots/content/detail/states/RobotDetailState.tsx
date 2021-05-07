import { Box, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import RobotDetailStateCard from './RobotDetailStateCard';
import { RobotDetailStateInterface } from './RobotDetailStates.interface';
import { mapRobotStates } from './RobotDetailStates.map';
import { RobotDetailStatesStyles } from './RobotDetailStates.style';

const RobotDetailState: FC<RobotDetailStateInterface> = (props) => {
	const { robotTwin, state } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailStatesStyles();

	return state && state.content ? (
		<Box className={classes.sStateContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sStateTitle}>
				{t(state.title)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				{Object.keys(state.content)
					.filter((p) => p !== 'updatedAt')
					.map((property) => {
						const mappedResult = mapRobotStates(`${state.type}.${property}`, robotTwin);
						return (
							mappedResult && (
								<Grid key={property} item xs={12} sm={6} md={4} lg={3}>
									<RobotDetailStateCard
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
export default RobotDetailState;
