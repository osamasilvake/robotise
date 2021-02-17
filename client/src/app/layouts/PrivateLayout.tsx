import { Box, Container } from '@material-ui/core';
import React, { FC } from 'react';

import Header from '../frame/header/Header';
import Sidebar from '../frame/sidebar/Sidebar';
import { LayoutPageProperties } from '../routes/Routes.interfaces';

const PrivateLayout: FC<LayoutPageProperties> = ({ Component, route }: LayoutPageProperties) => {
	return (
		<Box className="rc-public-layout">
			<Sidebar />
			<Header />
			<Container fixed>
				<Box className="rc-content">
					<Component route={route} />
				</Box>
			</Container>
		</Box>
	);
};
export default PrivateLayout;
