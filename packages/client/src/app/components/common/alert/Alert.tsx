import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { FC } from 'react';

import { AlertInterface } from './Alert.interface';

const AlertCustom: FC<AlertInterface> = (props) => {
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
export default AlertCustom;
