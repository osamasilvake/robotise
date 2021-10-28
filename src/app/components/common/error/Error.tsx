import { Stack } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import { ErrorTypeEnum } from './Error.enum';
import { ErrorInterface } from './Error.interface';
import { ErrorStyle } from './Error.style';

const Error: FC<ErrorInterface> = (props) => {
	const { children, error } = props;
	const classes = ErrorStyle();

	switch (error) {
		case ErrorTypeEnum.PAGE_ERROR:
			return (
				<Stack
					spacing={0.5}
					alignItems="center"
					justifyContent="center"
					className={clsx(classes.sError, classes.sErrorPage)}>
					{children}
				</Stack>
			);

		case ErrorTypeEnum.ERROR_BOUNDARY:
			return (
				<Stack
					spacing={0.5}
					alignItems="center"
					justifyContent="center"
					height="100vh"
					className={classes.sError}>
					{children}
				</Stack>
			);

		default:
			return (
				<Stack
					spacing={0.5}
					alignItems="center"
					justifyContent="center"
					height="100vh"
					className={classes.sError}>
					{children}
				</Stack>
			);
	}
};
export default Error;
