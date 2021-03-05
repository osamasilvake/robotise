import { Snackbar } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Alert from '../../components/alert/Alert';
import { ConfigService } from '../../services';
import { generalSelector } from '../../slices/general/General.slice';

const Message: FC = () => {
	const { t } = useTranslation();

	const { triggerMessage } = useSelector(generalSelector);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (triggerMessage.severity && triggerMessage.text) {
			setOpen(true);
		}
	}, [triggerMessage]);

	/**
	 * handle close
	 */
	const handleClose = () => setOpen(false);

	return (
		<Snackbar
			anchorOrigin={ConfigService.AppOptions.snackbar.direction}
			autoHideDuration={ConfigService.AppOptions.snackbar.timeout}
			open={open}
			onClose={handleClose}>
			<Alert severity={triggerMessage.severity} handleClose={handleClose}>
				{t(triggerMessage.text)}
			</Alert>
		</Snackbar>
	);
};
export default Message;
