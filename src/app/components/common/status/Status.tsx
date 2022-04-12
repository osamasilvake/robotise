import { Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import { StatusTypeEnum } from './Status.enum';
import { StatusInterface } from './Status.interface';
import { StatusStyle } from './Status.style';

const Status: FC<StatusInterface> = (props) => {
	const { children, small, active, capitalize, level = -1 } = props;
	const classes = StatusStyle();

	return (
		<Typography
			variant="button"
			className={clsx(classes.sStatus, {
				[classes.sStatusCapitalize]: capitalize,
				[classes.sSmall]: small,
				[classes.sSuccessDark]:
					(level === -1 && active) || level === StatusTypeEnum.SUCCESS_DARK,
				[classes.sSuccessLight]:
					(level === -1 && active) || level === StatusTypeEnum.SUCCESS_LIGHT,
				[classes.sError]: (level === -1 && !active) || level === StatusTypeEnum.ERROR,
				[classes.sWarn]: level === StatusTypeEnum.WARN,
				[classes.sInfo]: level === StatusTypeEnum.INFO
			})}>
			<>{children}</>
		</Typography>
	);
};
export default Status;
