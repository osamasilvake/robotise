import './Dashboard.scss';

import { Box, Button } from '@material-ui/core';
import React, { FC } from 'react';

const Home: FC = () => {
	return (
		<Box component="section" className="rc-dashboard">
			<h1>Dashboard</h1>
			<Button color="primary">Hello</Button>
			<Button color="secondary">Hello</Button>
		</Box>
	);
};
export default Home;
