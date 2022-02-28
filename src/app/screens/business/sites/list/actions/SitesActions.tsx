import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { SitesActionsStyle } from './SitesActions.style';
import SitesHidden from './SitesHidden';

const SitesActions: FC = () => {
	const classes = SitesActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				{/* Hidden */}
				<SitesHidden />

				{/* Create Order */}
				<Box />
			</Stack>
		</Paper>
	);
};
export default SitesActions;
