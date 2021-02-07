import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import React, { FC, useState } from 'react';

const SimpleSnackbar: FC = () => {
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
		<Box>
			<Button onClick={handleOpen}>Open simple snackbar</Button>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Note archived"
				action={
					<>
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={handleClose}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</>
				}
			/>
		</Box>
	);
};
export default SimpleSnackbar;
