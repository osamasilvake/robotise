import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { GeneralAllPhoneCallsActionsInterface } from './GeneralAllPhoneCallsActions.interface';
import { GeneralAllPhoneCallsActionsStyle } from './GeneralAllPhoneCallsActions.style';
import GeneralAllPhoneCallsSite from './GeneralAllPhoneCallsSite';

const GeneralAllPhoneCallsActions: FC<GeneralAllPhoneCallsActionsInterface> = (props) => {
	const { siteId } = props;
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
			</Stack>
		</Paper>
	);
};
export default GeneralAllPhoneCallsActions;
