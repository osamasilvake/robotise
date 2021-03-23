import { Box, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotContentDetailInterface } from '../RobotContentDetail.interface';
import { mapRobotStates } from './RobotContentDetailStates.map';
import { RobotContentDetailStatesStyles } from './RobotContentDetailStates.style';
import RobotContentDetailStatesCard from './RobotContentDetailStatesCard';

const RobotContentDetailStates: FC<RobotContentDetailInterface> = (props) => {
	const { robot } = props;

	const { t } = useTranslation('ROBOTS');
	const robotContentDetailStatesClasses = RobotContentDetailStatesStyles();

	const robotStates = [
		{ title: 'Battery State', type: 'batteryState' },
		{ title: 'Docking State', type: 'dockingState' },
		{ title: 'Emergency Brake State', type: 'emergencyBrakeState' },
		{ title: 'Motor Left Wheel State', type: 'motorLeftWheelState' },
		{ title: 'Motor Right Wheel State', type: 'motorRightWheelState' }
	];

	return (
		<>
			{robotStates.map((state) =>
				robot[state.type] ? (
					<Box
						key={state.type}
						className={robotContentDetailStatesClasses.sStateContainer}>
						{/* Title */}
						<Typography
							variant="h4"
							className={robotContentDetailStatesClasses.sStateTitle}>
							{t(state.title)}
						</Typography>

						{/* State */}
						<Box>
							<Grid container spacing={1}>
								{Object.keys(robot[state.type]).map((item) => (
									<Grid key={item} item xs={12} sm={6} md={3}>
										<RobotContentDetailStatesCard
											state={mapRobotStates(
												`${state.type}.${item}`,
												robot
											)}></RobotContentDetailStatesCard>
									</Grid>
								))}
							</Grid>
						</Box>
					</Box>
				) : null
			)}
		</>
	);
};
export default RobotContentDetailStates;
