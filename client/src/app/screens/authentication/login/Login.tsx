import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Login: FC = () => {
	return (
		<Box component="section" className="rc-login">
			<Typography variant="h1">Login</Typography>
			<Typography variant="body1">This is a login Page</Typography>
		</Box>
	);
};
export default Login;
