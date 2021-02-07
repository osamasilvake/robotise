import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { FC } from 'react';

import { styles } from './styles';

const Loader: FC = () => {
	return (
		<Box component="section" className="cd-vh-center" textAlign="center">
			<Box component="div" className="logo" marginBottom="15px">
				<img width="128" src="assets/svg/logos/robotise.svg" alt="logo" />
			</Box>
			<Box component="div" style={styles.spinner}>
				<CircularProgress color="inherit" />
			</Box>
		</Box>
	);
};
export default Loader;
