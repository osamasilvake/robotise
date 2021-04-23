import { Paper } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const AlertConfig: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="ALERT_CONFIG.TITLE" description="ALERT_CONFIG.DESCRIPTION" />
		</Paper>
	);
};
export default AlertConfig;
