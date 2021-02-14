import './About.scss';

import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

const About: FC = () => {
	return (
		<section className="cd-vh-center rc-about">
			<Typography variant="h1" component="h2" gutterBottom>
				About
			</Typography>
			<Typography variant="body1" gutterBottom>
				About Page
			</Typography>
		</section>
	);
};
export default About;
