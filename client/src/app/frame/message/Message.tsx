import { Snackbar } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '../../components/alert/Alert';
import { AppConfigService } from '../../services';
import { generalSelector, GeneralTriggerMessage } from '../../slices/general/General.slice';

const Message: FC = () => {
	const { t } = useTranslation('GLOBAL');

	const dispatch = useDispatch();
	const { triggerMessage } = useSelector(generalSelector);

	/**
	 * dispatch: trigger message
	 */
	const handleCloseMessage = () => dispatch(GeneralTriggerMessage({ show: false }));

	return (
		<Snackbar
			anchorOrigin={AppConfigService.AppOptions.snackbar.direction}
			autoHideDuration={AppConfigService.AppOptions.snackbar.timeout}
			open={triggerMessage.show}
			onClose={handleCloseMessage}>
			<Alert severity={triggerMessage.severity} handleClose={handleCloseMessage}>
				{triggerMessage.text && t(triggerMessage.text)}
			</Alert>
		</Snackbar>
	);
};
export default Message;
