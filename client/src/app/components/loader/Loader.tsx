import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import React, { FC } from 'react';

import { AppImageURLs, AppOptions } from '../../../app.config';
import { centerStyles } from '../../utilities/styles/helpers/AlignmentCenter.styles';
import { loaderStyles } from './Loader.styles';

const Loader: FC = () => {
	const center = centerStyles();
	const loader = loaderStyles();

	return (
		<Box component="section" className={clsx('rc-loader', center.vhCenter)} textAlign="center">
			<Box component="div" className="logo" marginBottom="15px">
				<Avatar
					className={loader.avatar}
					alt={AppOptions.company.name}
					src={AppImageURLs.logo.icon}
				/>
			</Box>
			<Box component="div" className={loader.spinner}>
				<CircularProgress color="inherit" />
			</Box>
		</Box>
	);
};
export default Loader;
