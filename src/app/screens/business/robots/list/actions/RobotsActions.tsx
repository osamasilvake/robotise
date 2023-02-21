import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { RobotsActionsInterface } from './RobotsActions.interface';
import { RobotsActionsStyle } from './RobotsActions.style';
import RobotsCreate from './RobotsCreate';
import RobotsHidden from './RobotsHidden';
import RobotsSearch from './RobotsSearch';
import RobotsSimulation from './RobotsSimulation';

const RobotsActions: FC<RobotsActionsInterface> = (props) => {
	const { hideCreateBtn } = props;
	const classes = RobotsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					{/* Hidden */}
					<RobotsHidden />

					{/* Simulation */}
					<RobotsSimulation />

					{/* Search */}
					<RobotsSearch />
				</Stack>

				{/* Create Robot */}
				{!hideCreateBtn && <RobotsCreate />}
			</Stack>
		</Paper>
	);
};
export default RobotsActions;
