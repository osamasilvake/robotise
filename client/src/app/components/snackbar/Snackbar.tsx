import { Box, Button, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { FC, useState } from 'react';

import { ConfigService } from '../../services';
import { SnackbarInterface } from './Snackbar.interface';

const SimpleSnackbar: FC<SnackbarInterface> = (props) => {
	const { snackbarClass, message } = props;

	const [open, setOpen] = useState(false);

	/**
	 * handle close
	 */
	const handleClose = () => {
		setOpen(true);
	};

	/**
	 * handle open
	 */
	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Box className={snackbarClass}>
			<Button onClick={handleOpen}>Open simple snackbar</Button>
			<Snackbar
				anchorOrigin={ConfigService.AppOptions.snackbar.direction}
				autoHideDuration={ConfigService.AppOptions.snackbar.timeout}
				open={open}
				onClose={handleClose}
				message={message}
				action={
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={handleClose}>
						<CloseIcon fontSize="small" />
					</IconButton>
				}
			/>
		</Box>
	);
};
export default SimpleSnackbar;
