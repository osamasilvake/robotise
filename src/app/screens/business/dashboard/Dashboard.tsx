import { Paper, Typography } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const Dashboard: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead onlyMeta title="DASHBOARD.TITLE" description="DASHBOARD.DESCRIPTION" />

			{/* Content */}
			<Typography variant="h1">Dashboard</Typography>
		</Paper>
	);
};
export default Dashboard;
