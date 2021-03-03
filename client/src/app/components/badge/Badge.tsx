import { Badge } from '@material-ui/core';
import React, { FC } from 'react';

import { badgeStyles } from './Badge.styles';
import { BadgeInterface } from './Menu.interface';

const AppBadge: FC<BadgeInterface> = (props) => {
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
