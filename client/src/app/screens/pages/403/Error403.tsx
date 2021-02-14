import './Error403.scss';

import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Error403: FC = () => {
	return (
		<section className="cd-vh-center rc-e403">
			<Typography variant="h1" component="h2" gutterBottom>
				403
			</Typography>
			<Typography variant="body1" gutterBottom>
				Private Page
			</Typography>
		</section>
	);
};
export default Error403;
