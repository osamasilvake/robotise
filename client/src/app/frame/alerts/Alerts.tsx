import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { FC } from 'react';

const Alert: FC = (props: AlertProps) => {
	return <MuiAlert elevation={3} variant="outlined" {...props} />;
};
export default Alert;
