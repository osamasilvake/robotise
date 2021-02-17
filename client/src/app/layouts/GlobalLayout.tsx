import { Box } from '@material-ui/core';
import React, { FC } from 'react';

import { LayoutPageProperties } from '../routes/Routes.interfaces';

const GlobalLayout: FC<LayoutPageProperties> = ({ Component, route }: LayoutPageProperties) => {
	return (
		<Box className="rc-global-layout">
			<Box className="rc-content">
				<Component route={route} />
			</Box>
		</Box>
	);
};
export default GlobalLayout;
