import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { GeneralAllPhoneCallsActionsInterface } from './GeneralAllPhoneCallsActions.interface';
import { GeneralAllPhoneCallsActionsStyle } from './GeneralAllPhoneCallsActions.style';
import GeneralAllPhoneCallsIncludeAllCalls from './GeneralAllPhoneCallsIncludeAllCalls';
import GeneralAllPhoneCallsSite from './GeneralAllPhoneCallsSite';

const GeneralAllPhoneCallsActions: FC<GeneralAllPhoneCallsActionsInterface> = (props) => {
	const { siteId, includeAllCalls } = props;
	const classes = GeneralAllPhoneCallsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Stack
					spacing={0.5}
					direction="row"
					alignItems="center"
					justifyContent="space-between">
					{/* Site */}
					<GeneralAllPhoneCallsSite siteId={siteId} />
				</Stack>

				{/* Include All Calls */}
				<GeneralAllPhoneCallsIncludeAllCalls includeAllCalls={includeAllCalls} />
			</Stack>
		</Paper>
	);
};
export default GeneralAllPhoneCallsActions;
