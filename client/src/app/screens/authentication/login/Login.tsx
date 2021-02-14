import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Login: FC = () => {
	return (
		<section className="rc-login">
			<Typography variant="h1" component="h2" gutterBottom>
				Login
			</Typography>
			<Typography variant="body1" gutterBottom>
				This is a login Page
			</Typography>
		</section>
	);
};
export default Login;
