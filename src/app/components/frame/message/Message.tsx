import { Alert, IconButton, Slide, Snackbar, SnackbarOrigin } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../services';
import { generalSelector, GeneralTriggerMessage } from '../../../slices/general/General.slice';
import { TriggerMessageTypeEnum } from './Message.enum';

const Message: FC = () => {
	const { t } = useTranslation('MESSAGE');

	const dispatch = useDispatch();
	const general = useSelector(generalSelector);

	/**
	 * dispatch: trigger message
	 */
	const handleCloseMessage = () =>
		dispatch(
			GeneralTriggerMessage({
				id: general.triggerMessage.id,
				show: false,
				severity: general.triggerMessage.severity,
				text: general.triggerMessage.text
			})
		);

	return (
		<Snackbar
			key={general.triggerMessage.id}
			open={general.triggerMessage.show}
			onClose={handleCloseMessage}
			ClickAwayListenerProps={{ mouseEvent: false }}
			anchorOrigin={
				AppConfigService.AppOptions.components.snackbar.direction as SnackbarOrigin
			}
			autoHideDuration={
				general.triggerMessage.severity === TriggerMessageTypeEnum.ERROR
					? AppConfigService.AppOptions.components.snackbar.timeout.slow
					: AppConfigService.AppOptions.components.snackbar.timeout.fast
			}
			TransitionComponent={Slide}>
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
	);
};
export default Message;
