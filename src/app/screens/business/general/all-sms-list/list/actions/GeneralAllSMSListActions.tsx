import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { GeneralAllSMSListActionsInterface } from './GeneralAllSMSListActions.interface';
import { GeneralAllSMSListActionsStyle } from './GeneralAllSMSListActions.style';
import GeneralAllSMSListIncludeAllCalls from './GeneralAllSMSListActionsIncludeAllCalls';
import GeneralAllSMSListSite from './GeneralAllSMSListActionsSite';

const GeneralAllSMSListActions: FC<GeneralAllSMSListActionsInterface> = (props) => {
	const { siteId, includeAllCalls } = props;
	const classes = GeneralAllSMSListActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Stack
					spacing={0.5}
					direction="row"
					alignItems="center"
					justifyContent="space-between">
					{/* Site */}
					<GeneralAllSMSListSite siteId={siteId} />
				</Stack>

				{/* Include All Calls */}
				<GeneralAllSMSListIncludeAllCalls includeAllCalls={includeAllCalls} />
			</Stack>
		</Paper>
	);
};
export default GeneralAllSMSListActions;
