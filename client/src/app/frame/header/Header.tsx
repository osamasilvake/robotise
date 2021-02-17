import './Header.scss';

import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import React, { FC } from 'react';

const Header: FC = () => {
	return (
		<Box className="rc-header">
			<Typography variant="body1">Header</Typography>
		</Box>
	);
};
export default Header;
