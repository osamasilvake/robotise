import { Box } from '@material-ui/core';
import { FC } from 'react';

import { LayoutPageInterface } from '../../routes/Routes.interfaces';

const GlobalLayout: FC<LayoutPageInterface> = ({ Component, route }: LayoutPageInterface) => {
	return (
		<Box component="main">
			<Component route={route} />
		</Box>
	);
};
export default GlobalLayout;
