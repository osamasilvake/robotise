import { Badge } from '@material-ui/core';
import React, { FC } from 'react';

import { BadgeTypeEnum } from './Badge.enum';
import { BadgeInterface } from './Badge.interface';
import { badgeStyles } from './Badge.styles';

const AppBadge: FC<BadgeInterface> = (props) => {
	const { children, type } = props;
	const badgeClasses = badgeStyles();

	/**
	 * get badge based on the given type
	 * @param type
	 */
	const getBadge = (type: BadgeTypeEnum) => {
		switch (type) {
			case BadgeTypeEnum.NUMBER:
				return (
					<Badge badgeContent={4} color="primary">
						{children}
					</Badge>
				);
			default:
				return (
					<Badge
						classes={{ badge: badgeClasses.badgeDot }}
						overlap="circle"
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						variant="dot">
						{children}
					</Badge>
				);
		}
	};

	return getBadge(type || BadgeTypeEnum.DOT);
};
export default AppBadge;
