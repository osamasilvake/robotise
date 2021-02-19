import { Link, Typography } from '@material-ui/core';
import React, { FC } from 'react';

import { AppOptions } from '../../../app.config';

const Copyright: FC = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			<Link color="inherit" href={AppOptions.company.link} target="_blank">
				{AppOptions.company.name}
			</Link>
			{' © '}
			{new Date().getFullYear()}
			{' • '}
			{process.env.REACT_APP_NAME?.toUpperCase()} v{process.env.REACT_APP_VERSION}
		</Typography>
	);
};
export default Copyright;
