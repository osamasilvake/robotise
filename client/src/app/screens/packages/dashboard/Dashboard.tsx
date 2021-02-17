import { Box, Button } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import ENV from '../../../../environment';

const Home: FC = () => {
	return (
		<Box component="section" className="rc-dashboard">
			<h1>Dashboard</h1>
			<Button color="primary">Hello</Button>
			<Button color="secondary">Hello</Button>
			<Link to={ENV().ROUTING.PACKAGES.SITES}>Go To Sites</Link>
		</Box>
	);
};
export default Home;
