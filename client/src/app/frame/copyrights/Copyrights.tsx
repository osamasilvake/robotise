import { Link, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Copyright: FC = () => {
	console.log(process.env);
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			<Link color="inherit" href={process.env.REACT_APP_URL} target="_blank">
				{process.env.REACT_APP_AUTHOR}
			</Link>
			{' © '}
			{new Date().getFullYear()}
			{' • '}
			{process.env.REACT_APP_NAME?.toUpperCase()} v{process.env.REACT_APP_VERSION}
		</Typography>
	);
};
export default Copyright;
