import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { FC } from 'react';

import { AlertInterface } from './Alert.interface';

const AlertCustom: FC<AlertInterface> = (props) => {
	const { children, handleClose, ...rest } = props;

	return (
		<Alert
			elevation={3}
			action={
				<IconButton size="small" color="inherit" onClick={handleClose}>
					<CloseIcon fontSize="small" />
				</IconButton>
			}
			{...rest}>
			{children}
		</Alert>
	);
};
export default AlertCustom;
