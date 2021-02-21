import { Avatar, Box, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';

import AppConfig from '../../../app.config';
import { ApiEnv } from '../../services';
import { centerStyles } from '../../utilities/styles/AlignmentCenter.styles';
import { loaderStyles } from './Loader.styles';

const Loader: FC = () => {
	const center = centerStyles();
	const loader = loaderStyles();

	return (
		<Box component="section" className={clsx('rc-loader', center.vhCenter)} textAlign="center">
			<Box component="div" className="logo" marginBottom="15px">
				<Avatar
					className={loader.avatar}
					alt={ApiEnv.author}
					src={AppConfig.AppImageURLs.logo.icon}
				/>
			</Box>
			<Box component="div" className={loader.spinner}>
				<CircularProgress color="inherit" />
			</Box>
		</Box>
	);
};
export default Loader;
