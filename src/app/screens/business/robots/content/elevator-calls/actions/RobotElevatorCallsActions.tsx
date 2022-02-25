import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { RobotElevatorCallsActionsStyle } from './RobotElevatorCallsActions.style';
import RobotElevatorCallsTest from './RobotElevatorCallsTest';

const RobotElevatorCallsActions: FC = () => {
	const classes = RobotElevatorCallsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box />
				<Box>
					{/* Test Elevator Calls */}
					<RobotElevatorCallsTest />
				</Box>
			</Stack>
		</Paper>
	);
};
export default RobotElevatorCallsActions;
