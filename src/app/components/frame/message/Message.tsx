import { Close } from '@mui/icons-material';
import { Alert, IconButton, Slide, Snackbar, SnackbarOrigin } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../services';
import { AppDispatch } from '../../../slices';
import { appSelector, AppTriggerMessage } from '../../../slices/app/App.slice';
import { TriggerMessageTypeEnum } from './Message.enum';

const Message: FC = () => {
	const { t } = useTranslation('FRAME');

	const dispatch = useDispatch<AppDispatch>();
	const app = useSelector(appSelector);

	const { id, show, severity, text, dynamicText } = app.triggerMessage;

	/**
	 * dispatch: trigger message
	 */
	const handleCloseMessage = () =>
		dispatch(
			AppTriggerMessage({
				id: app.triggerMessage.id,
				show: false,
				severity: app.triggerMessage.severity,
				text: app.triggerMessage.text
			})
		);

	return (
		<Snackbar
			key={id}
			open={show}
			onClose={handleCloseMessage}
			ClickAwayListenerProps={{ mouseEvent: false }}
			anchorOrigin={
				AppConfigService.AppOptions.components.snackbar.direction as SnackbarOrigin
			}
			autoHideDuration={
				severity === TriggerMessageTypeEnum.ERROR
					? AppConfigService.AppOptions.components.snackbar.timeout.slow
					: AppConfigService.AppOptions.components.snackbar.timeout.fast
			}
			TransitionComponent={Slide}>
			<Alert
				elevation={3}
				action={
					<IconButton size="small" color="inherit" onClick={handleCloseMessage}>
						<Close fontSize="small" />
					</IconButton>
				}
				severity={severity}>
				{text && (!dynamicText ? t(`MESSAGE.${text}`) : text)}
			</Alert>
		</Snackbar>
	);
};
export default Message;
