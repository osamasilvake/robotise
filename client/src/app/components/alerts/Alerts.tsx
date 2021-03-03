import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import React, { FC } from 'react';

import { AlertsInterface } from './Alerts.interface';

const Alerts: FC<AlertsInterface> = (props) => {
	const { handleClose, severity, children } = props;

	return (
		<Alert
			elevation={3}
			severity={severity}
			action={
				<IconButton size="small" color="inherit" onClick={handleClose}>
					<CloseIcon fontSize="small" />
				</IconButton>
			}>
			{children}
		</Alert>
	);
};
export default Alerts;
