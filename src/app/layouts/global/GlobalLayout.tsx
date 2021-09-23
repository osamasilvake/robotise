import { Box } from '@mui/material';
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
