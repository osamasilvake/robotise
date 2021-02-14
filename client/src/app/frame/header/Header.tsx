import './Header.scss';

import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Header: FC = () => {
	return (
		<header className="rc-header">
			<Typography variant="body1" gutterBottom>
				Header
			</Typography>
		</header>
	);
};
export default Header;
