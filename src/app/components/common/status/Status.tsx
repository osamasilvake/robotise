import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import { StatusTypeEnum } from './Status.enum';
import { StatusInterface } from './Status.interface';
import { StatusStyles } from './Status.style';

const Status: FC<StatusInterface> = (props) => {
	const { children, small, active, level = -1 } = props;
	const classes = StatusStyles();

	return (
		<Typography
			variant="button"
			className={clsx(classes.sStatus, {
				[classes.sSmall]: small,
				[classes.sSuccess]: (level === -1 && active) || level === StatusTypeEnum.SUCCESS,
				[classes.sError]: (level === -1 && !active) || level === StatusTypeEnum.ERROR,
				[classes.sWarning]: level === StatusTypeEnum.WARN,
				[classes.sInit]: level === StatusTypeEnum.INIT,
				[classes.sNotice]: level === StatusTypeEnum.NOTICE
			})}>
			{children}
		</Typography>
	);
};
export default Status;
