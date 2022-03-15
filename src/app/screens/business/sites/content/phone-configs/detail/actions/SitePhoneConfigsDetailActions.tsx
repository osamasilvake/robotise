import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { SitePhoneConfigsDetailActionsStyle } from './SitePhoneConfigsDetailActions.style';
import SitePhoneConfigsEdit from './SitePhoneConfigsEdit';

const SitePhoneConfigsDetailActions: FC = () => {
	const classes = SitePhoneConfigsDetailActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box />
				<Box>
					<SitePhoneConfigsEdit />
				</Box>
			</Stack>
		</Paper>
	);
};
export default SitePhoneConfigsDetailActions;
