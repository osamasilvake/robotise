import { Badge } from '@material-ui/core';
import React, { FC } from 'react';

import { badgeStyles } from './Badge.styles';

const AppBadge: FC = (props) => {
	const { children } = props;
	const badgeClasses = badgeStyles();

	return (
		<Badge
			classes={{ badge: badgeClasses.badge }}
			overlap="circle"
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			variant="dot">
			{children}
		</Badge>
	);
};
export default AppBadge;
