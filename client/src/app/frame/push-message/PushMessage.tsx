import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ConfigService } from '../../services';
import { generalSelector } from '../../slices/general/General.slice';

const PushMessage: FC = () => {
	const { t } = useTranslation();

	const { pushMessage } = useSelector(generalSelector);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (pushMessage.severity && pushMessage.text) {
			setOpen(true);
		}
	}, [pushMessage]);

	/**
	 * handle close
	 */
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Snackbar
			anchorOrigin={ConfigService.AppOptions.snackbar.direction}
			autoHideDuration={ConfigService.AppOptions.snackbar.timeout}
			open={open}
			onClose={handleClose}>
			<Alert
				severity={pushMessage.severity}
				action={
					<IconButton
						size="small"
						color="inherit"
						onClick={handleClose}
						aria-label="close">
						<CloseIcon fontSize="small" />
					</IconButton>
				}>
				{t(pushMessage.text)}
			</Alert>
		</Snackbar>
	);
};
export default PushMessage;
