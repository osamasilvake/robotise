import './Error404.scss';

import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Error404: FC = () => {
	return (
		<section className="cd-vh-center rc-e404">
			<Typography variant="h1" component="h2" gutterBottom>
				404
			</Typography>
			<Typography variant="body1" gutterBottom>
				Page not found
			</Typography>
		</section>
	);
};
export default Error404;
