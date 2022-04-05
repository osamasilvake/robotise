import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { MiddlewareConfigActionsStyle } from './MiddlewareConfigActions.style';
import MiddlewareConfigCreate from './MiddlewareConfigCreate';

const MiddlewareConfigActions: FC = () => {
	const classes = MiddlewareConfigActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box />

				{/*  Create Middleware Config */}
				<MiddlewareConfigCreate />
			</Stack>
		</Paper>
	);
};
export default MiddlewareConfigActions;
