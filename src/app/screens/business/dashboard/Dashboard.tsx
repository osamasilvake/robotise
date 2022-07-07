import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const Dashboard: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="DASHBOARD.TITLE" description="DASHBOARD.DESCRIPTION" />
		</Paper>
	);
};
export default Dashboard;
