import { Box } from '@material-ui/core';
import { FC } from 'react';

import { CenterStyle } from '../../../utilities/styles/Center.style';
import { ErrorTypeEnum } from './Error.enum';
import { ErrorInterface } from './Error.interface';

const Error: FC<ErrorInterface> = (props) => {
	const { children, error } = props;
	const centerClasses = CenterStyle();

	switch (error) {
		case ErrorTypeEnum.PAGE_ERROR:
			return <Box className={centerClasses.sHFlex}>{children}</Box>;

		case ErrorTypeEnum.ERROR_BOUNDARY:
			return <Box className={centerClasses.sVHFlex}>{children}</Box>;

		default:
			return <Box className={centerClasses.sVHFlex}>{children}</Box>;
	}
};
export default Error;
