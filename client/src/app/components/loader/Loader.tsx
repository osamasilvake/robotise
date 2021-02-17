import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import React, { FC } from 'react';

import { AppOptions, imageURLs } from '../../../app.config';
import { centerStyles } from '../../utilities/styles/helpers/Center.styles';
import { loaderStyles } from './Loader.styles';

const Loader: FC = () => {
	const center = centerStyles();
	const loader = loaderStyles();

	return (
		<Box component="section" className={clsx('rc-loader', center.vhCenter)} textAlign="center">
			<Box component="div" className="logo" marginBottom="15px">
				<Avatar
					className={loader.avatar}
					alt={AppOptions.author}
					src={imageURLs.logoIcon}
				/>
			</Box>
			<Box component="div" className={loader.spinner}>
				<CircularProgress color="inherit" />
			</Box>
		</Box>
	);
};
export default Loader;
