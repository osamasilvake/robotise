import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import { StatusInterface } from './Status.interface';
import { StatusStyles } from './Status.style';

const Status: FC<StatusInterface> = (props) => {
	const { children, active, small } = props;
	const statusClasses = StatusStyles();

	return (
		<Typography
			variant="button"
			className={clsx(statusClasses.sStatus, {
				[statusClasses.sStatusSmall]: small,
				[statusClasses.sStatusActive]: active,
				[statusClasses.sStatusInActive]: !active
			})}>
			{children}
		</Typography>
	);
};
export default Status;
