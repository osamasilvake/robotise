import { Box } from '@material-ui/core';
import React, { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const AlertConfig: FC = () => {
	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead title="ALERT_CONFIG.TITLE" description="ALERT_CONFIG.DESCRIPTION" />
		</Box>
	);
};
export default AlertConfig;
