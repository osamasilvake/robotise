import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { SiteProductsActionsStyle } from './SiteProductsActions.style';
import SiteProductsCreate from './SiteProductsCreate';

const SiteProductsActions: FC = () => {
	const classes = SiteProductsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="end">
				<Box />

				{/* Create Product */}
				<SiteProductsCreate />
			</Stack>
		</Paper>
	);
};
export default SiteProductsActions;
