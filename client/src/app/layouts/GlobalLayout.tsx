import { Box } from '@material-ui/core';
import React, { FC } from 'react';

import { LayoutPageInterface } from '../routes/Routes.interfaces';

const GlobalLayout: FC<LayoutPageInterface> = ({ Component, route }: LayoutPageInterface) => {
	return (
		<Box className="rc-global-layout">
			<Box className="rc-content">
				<Component route={route} />
			</Box>
		</Box>
	);
};
export default GlobalLayout;
