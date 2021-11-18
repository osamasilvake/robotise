import { Box } from '@mui/material';
import { FC } from 'react';

import { LayoutPageInterface } from '../../routes/Routes.interfaces';

const GlobalLayout: FC<LayoutPageInterface> = (props) => {
	const { Component } = props;

	return (
		<Box component="main">
			<Component />
		</Box>
	);
};
export default GlobalLayout;
