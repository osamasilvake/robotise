import { Badge } from '@material-ui/core';
import { FC } from 'react';

import { BadgeTypeEnum } from './Badge.enum';
import { BadgeInterface } from './Badge.interface';
import { badgeStyles } from './Badge.styles';

const AppBadge: FC<BadgeInterface> = (props) => {
	const { children, options } = props;
	const badgeClasses = badgeStyles();

	// number
	if (options?.type === BadgeTypeEnum.NUMBER) {
		return (
			<Badge badgeContent={options?.count} color={options?.color || 'primary'}>
				{children}
			</Badge>
		);
	}

	return (
		<Badge
			classes={{ badge: badgeClasses.sDot }}
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
