import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { GeneralEmailsActionsInterface } from './GeneralEmailsActions.interface';
import { GeneralEmailsActionsStyle } from './GeneralEmailsActions.style';
import GeneralEmailDelivered from './GeneralEmailsDelivered';
import GeneralEmailsSite from './GeneralEmailsSite';

const GeneralEmailsActions: FC<GeneralEmailsActionsInterface> = (props) => {
	const { siteId, delivered } = props;
	const classes = GeneralEmailsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					{/* Site */}
					<GeneralEmailsSite siteId={siteId} />
				</Box>

				{/* Delivered */}
				<GeneralEmailDelivered delivered={delivered} />
			</Stack>
		</Paper>
	);
};
export default GeneralEmailsActions;
