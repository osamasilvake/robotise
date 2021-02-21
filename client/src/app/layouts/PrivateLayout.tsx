import { Box, Container } from '@material-ui/core';
import React, { FC } from 'react';

import Header from '../frame/header/Header';
import Sidebar from '../frame/sidebar/Sidebar';
import { LayoutPageInterface } from '../routes/Routes.interfaces';

const PrivateLayout: FC<LayoutPageInterface> = ({ Component, route }: LayoutPageInterface) => {
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
