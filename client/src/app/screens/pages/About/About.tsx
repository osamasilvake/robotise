import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';

import { useStyles } from '../../../utilities/styles/helpers/Center.style';

const About: FC = () => {
	const classes = useStyles();

	return (
		<Box component="section" className={clsx('rc-about', classes.vhCenter)}>
			<Typography variant="h1">About</Typography>
			<Typography variant="body1">About Page</Typography>
		</Box>
	);
};
export default About;
