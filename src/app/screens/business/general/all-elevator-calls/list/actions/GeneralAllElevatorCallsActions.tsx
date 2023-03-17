import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { GeneralAllElevatorCallsActionsInterface } from './GeneralAllElevatorCallsActions.interface';
import { GeneralAllElevatorCallsActionsStyle } from './GeneralAllElevatorCallsActions.style';
import GeneralAllElevatorCallsIncludeAllCalls from './GeneralAllElevatorCallsIncludeAllCalls';
import GeneralAllElevatorCallsSite from './GeneralAllElevatorCallsSite';
import GeneralAllElevatorCallType from './GeneralAllElevatorCallType';
import GeneralAllElevatorVendor from './GeneralAllElevatorVendor';

const GeneralAllElevatorCallsActions: FC<GeneralAllElevatorCallsActionsInterface> = (props) => {
	const { siteId, callType, vendor, includeAllCalls } = props;
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

					{/* Call Type */}
					<GeneralAllElevatorCallType callType={callType} />

					{/* Vendor */}
					<GeneralAllElevatorVendor vendor={vendor} />
				</Stack>

				{/* Include All Calls */}
				<GeneralAllElevatorCallsIncludeAllCalls includeAllCalls={includeAllCalls} />
			</Stack>
		</Paper>
	);
};
export default GeneralAllElevatorCallsActions;
