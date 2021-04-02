import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import { StatusInterface } from './Status.interface';
import { StatusStyles } from './Status.style';

const Status: FC<StatusInterface> = (props) => {
	const { children, active, small } = props;
	const classes = StatusStyles();

	return (
		<Typography
			variant="button"
			className={clsx(classes.sStatus, {
				[classes.sStatusSmall]: small,
				[classes.sStatusActive]: active,
				[classes.sStatusInActive]: !active
			})}>
			{children}
		</Typography>
	);
};
export default Status;
