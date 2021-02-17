import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { FC } from 'react';

import { AppOptions, imageURLs } from '../../../app.config';
import { useStyles } from './Loader.styles';

const Loader: FC = () => {
	const classes = useStyles();

	return (
		<Box component="section" className="rc-loader cd-vh-center" textAlign="center">
			<Box component="div" className="logo" marginBottom="15px">
				<Avatar
					className={classes.avatar}
					alt={AppOptions.author}
					src={imageURLs.logoIcon}
				/>
			</Box>
			<Box component="div" className={classes.spinner}>
				<CircularProgress color="inherit" />
			</Box>
		</Box>
	);
};
export default Loader;
