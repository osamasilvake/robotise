import { Badge } from '@material-ui/core';
import { FC } from 'react';

import { BadgeTypeEnum } from './Badge.enum';
import { BadgeInterface } from './Badge.interface';
import { BadgeStyle } from './Badge.style';

const AppBadge: FC<BadgeInterface> = (props) => {
	const { children, type, count, color } = props;
	const classes = BadgeStyle();

	if (type === BadgeTypeEnum.NUMBER) {
		return (
			<Badge badgeContent={count} color={color || 'primary'}>
				{children}
			</Badge>
		);
	}
	return (
		<Badge
			variant="dot"
			classes={{ badge: classes.sDot }}
			overlap="circular"
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}>
			{children}
		</Badge>
	);
};
export default AppBadge;
