import { Box, Button, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import ENV from '../../../../environment';
import Meta from '../../../frame/meta/Meta';

const Home: FC = () => {
	return (
		<>
			<Meta title="Dashboard" description="Doashboard Description" />
			<Box component="section" className="rc-dashboard">
				<Typography variant="h1">Dashboard</Typography>
				<Button color="primary">Hello</Button>
				<Button color="secondary">Hello</Button>
				<Link to={ENV().ROUTING.PACKAGES.SITES}>Go To Sites</Link>
			</Box>
		</>
	);
};
export default Home;
