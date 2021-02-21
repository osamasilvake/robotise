import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Error403: FC = () => {
	return (
		<Box component="section" className="rc-e403">
			<Typography variant="h1">403</Typography>
			<Typography variant="body1">Private Page</Typography>
		</Box>
	);
};
export default Error403;
