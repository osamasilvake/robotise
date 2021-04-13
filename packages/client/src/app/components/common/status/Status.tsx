import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import { StatusTypeEnum } from './Status.enum';
import { StatusInterface } from './Status.interface';
import { StatusStyles } from './Status.style';

const Status: FC<StatusInterface> = (props) => {
	const { children, small, active, level } = props;
	const classes = StatusStyles();

	return (
		<Typography
			variant="button"
			className={clsx(classes.sStatus, {
				[classes.sStatusSmall]: small,
				[classes.sStatusSuccess]: (!level && active) || level === StatusTypeEnum.SUCCESS,
				[classes.sStatusWarning]: level === StatusTypeEnum.WARNING,
				[classes.sStatusError]: (!level && !active) || level === StatusTypeEnum.ERROR
			})}>
			{children}
		</Typography>
	);
};
export default Status;
