import { Close } from '@mui/icons-material';
import { Alert, IconButton, Slide, Snackbar, SnackbarOrigin } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../services';
import { appSelector, AppTriggerMessage } from '../../../slices/app/App.slice';
import { TriggerMessageTypeEnum } from './Message.enum';

const Message: FC = () => {
	const { t } = useTranslation('MESSAGE');

	const dispatch = useDispatch();
	const app = useSelector(appSelector);

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
			key={app.triggerMessage.id}
			open={app.triggerMessage.show}
			onClose={handleCloseMessage}
			ClickAwayListenerProps={{ mouseEvent: false }}
			anchorOrigin={
				AppConfigService.AppOptions.components.snackbar.direction as SnackbarOrigin
			}
			autoHideDuration={
				app.triggerMessage.severity === TriggerMessageTypeEnum.ERROR
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
				severity={app.triggerMessage.severity}>
				{app.triggerMessage.text && t(app.triggerMessage.text)}
			</Alert>
		</Snackbar>
	);
};
export default Message;
