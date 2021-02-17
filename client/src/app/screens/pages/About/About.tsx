import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';

import { centerStyles } from '../../../utilities/styles/helpers/Center.styles';

const About: FC = () => {
	const center = centerStyles();

	return (
		<Box component="section" className={clsx('rc-about', center.vhCenter)}>
			<Typography variant="h1">About</Typography>
			<Typography variant="body1">About Page</Typography>
		</Box>
	);
};
export default About;
