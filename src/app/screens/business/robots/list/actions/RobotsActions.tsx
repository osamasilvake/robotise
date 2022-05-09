import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { RobotsActionsInterface } from './RobotsActions.interface';
import { RobotsActionsStyle } from './RobotsActions.style';
import RobotsCreate from './RobotsCreate';
import RobotsHidden from './RobotsHidden';
import RobotsSimulation from './RobotsSimulation';

const RobotsActions: FC<RobotsActionsInterface> = (props) => {
	const { hideCreateBtn } = props;
	const classes = RobotsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					{/* Hidden */}
					<RobotsHidden />

					{/* Simulation */}
					<RobotsSimulation />
				</Box>

				{/* Create Robot */}
				{!hideCreateBtn && <RobotsCreate />}
			</Stack>
		</Paper>
	);
};
export default RobotsActions;
