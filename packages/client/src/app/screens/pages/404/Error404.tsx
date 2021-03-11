import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Error404: FC = () => {
	return (
		<Box component="section">
			<Typography variant="h1">404</Typography>
			<Typography variant="body1">Page not found</Typography>
		</Box>
	);
};
export default Error404;
