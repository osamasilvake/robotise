import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Dashboard: FC = () => {
	return (
		<Box component="section" className="rc-dashboard">
			<Typography component="h1" variant="h4">
				Dashboard
			</Typography>
		</Box>
	);
};
export default Dashboard;
