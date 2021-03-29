import { Slide, Snackbar, SnackbarOrigin } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../services';
import { generalSelector, GeneralTriggerMessage } from '../../../slices/general/General.slice';

const Message: FC = () => {
	const { t } = useTranslation('MESSAGE');

	const dispatch = useDispatch();
	const general = useSelector(generalSelector);

	/**
	 * dispatch: trigger message
	 */
	const handleCloseMessage = () => dispatch(GeneralTriggerMessage({ show: false }));

	return general.triggerMessage.show ? (
		<Snackbar
			anchorOrigin={
				AppConfigService.AppOptions.components.snackbar.direction as SnackbarOrigin
			}
			autoHideDuration={AppConfigService.AppOptions.components.snackbar.timeout}
			open={general.triggerMessage.show}
			TransitionComponent={Slide}
			onClose={handleCloseMessage}>
			<Alert
				elevation={3}
				action={
					<IconButton size="small" color="inherit" onClick={handleCloseMessage}>
						<CloseIcon fontSize="small" />
					</IconButton>
				}
				severity={general.triggerMessage.severity}>
				{general.triggerMessage.text && t(general.triggerMessage.text)}
			</Alert>
		</Snackbar>
	) : null;
};
export default Message;
