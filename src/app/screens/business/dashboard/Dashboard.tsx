import { Paper, Typography } from '@material-ui/core';
import { FC } from 'react';

const Dashboard: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			<Typography variant="h1">Dashboard</Typography>
		</Paper>
	);
};
export default Dashboard;
