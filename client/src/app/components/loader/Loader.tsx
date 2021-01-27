import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { FC } from 'react';

const Loader: FC = () => {
	return (
		<Box className="rc-loader">
			<CircularProgress color="secondary" />
		</Box>
	);
};
export default Loader;
