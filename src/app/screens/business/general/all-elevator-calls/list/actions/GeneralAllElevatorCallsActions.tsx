import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { GeneralAllElevatorCallsActionsInterface } from './GeneralAllElevatorCallsActions.interface';
import { GeneralAllElevatorCallsActionsStyle } from './GeneralAllElevatorCallsActions.style';
import GeneralAllElevatorCallsSite from './GeneralAllElevatorCallsSite';

const GeneralAllElevatorCallsActions: FC<GeneralAllElevatorCallsActionsInterface> = (props) => {
	const { siteId } = props;
	const classes = GeneralAllElevatorCallsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Stack
					spacing={0.5}
					direction="row"
					alignItems="center"
					justifyContent="space-between">
					{/* Site */}
					<GeneralAllElevatorCallsSite siteId={siteId} />
				</Stack>
			</Stack>
		</Paper>
	);
};
export default GeneralAllElevatorCallsActions;
