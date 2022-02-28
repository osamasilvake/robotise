import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { DeepLinksActionsStyle } from './DeepLinksActions.style';
import DeepLinksCreate from './DeepLinksCreate';

const DeepLinksActions: FC = () => {
	const classes = DeepLinksActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box />

				{/*  Create Deep */}
				<DeepLinksCreate />
			</Stack>
		</Paper>
	);
};
export default DeepLinksActions;
