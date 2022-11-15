import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { SitePhoneConfigsDetailActionsStyle } from './SitePhoneConfigsDetailActions.style';
import SitePhoneConfigsEdit from './SitePhoneConfigsEdit';
import SitePhoneConfigsTestOutboundCall from './SitePhoneConfigsTestOutboundCall';

const SitePhoneConfigsDetailActions: FC = () => {
	const classes = SitePhoneConfigsDetailActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box />
				<Stack
					spacing={0.5}
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					flexWrap="wrap">
					{/* Test Outbound Call */}
					<SitePhoneConfigsTestOutboundCall />

					{/* Edit */}
					<SitePhoneConfigsEdit />
				</Stack>
			</Stack>
		</Paper>
	);
};
export default SitePhoneConfigsDetailActions;
