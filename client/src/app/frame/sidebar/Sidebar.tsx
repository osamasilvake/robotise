import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Sidebar: FC = () => {
	return (
		<Box className="rc-sidebar">
			<Typography variant="body1">Sidebar</Typography>
		</Box>
	);
};
export default Sidebar;
