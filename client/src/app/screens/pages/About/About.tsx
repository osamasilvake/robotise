import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';

import { centerStyles } from '../../../utilities/styles/Center.style';

const About: FC = () => {
	const centerClasses = centerStyles();

	return (
		<Box component="section" className={clsx('rc-about', centerClasses.vhCenter)}>
			<Typography variant="h1">About</Typography>
			<Typography variant="body1">About Page</Typography>
		</Box>
	);
};
export default About;
