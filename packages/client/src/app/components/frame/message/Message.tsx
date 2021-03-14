import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../services';
import { generalSelector, GeneralTriggerMessage } from '../../../slices/general/General.slice';
import Alert from '../../common/alert/Alert';

const Message: FC = () => {
	const { t } = useTranslation('MESSAGE');

	const dispatch = useDispatch();
	const { triggerMessage } = useSelector(generalSelector);

	/**
	 * dispatch: trigger message
	 */
	const handleCloseMessage = () => dispatch(GeneralTriggerMessage({ show: false }));

	return (
		<Snackbar
			anchorOrigin={AppConfigService.AppOptions.snackbar.direction as SnackbarOrigin}
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
