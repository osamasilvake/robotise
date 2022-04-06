import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import {
	MiddlewareConfigDelete,
	MiddlewareConfigFetchList,
	middlewareConfigSelector
} from '../../../../../slices/settings/middleware-config/MiddlewareConfig.slice';
import { MiddlewareConfigResetTypeEnum } from './MiddlewareConfigTable.enum';
import { DialogDeleteMiddlewareConfigInterface } from './MiddlewareConfigTable.interface';

const DialogDeleteMiddlewareConfig: FC<DialogDeleteMiddlewareConfigInterface> = (props) => {
	const { config, open, setOpen } = props;
	const { t } = useTranslation(['MIDDLEWARE_CONFIG', 'DIALOG']);

	const dispatch = useDispatch();
	const middlewareConfig = useSelector(middlewareConfigSelector);

	const translation = 'LIST.ACTIONS.DELETE';

	/**
	 * delete middleware config
	 * @param status
	 * @returns
	 */
	const deleteMiddlewareConfig = (status: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		!status && setOpen(false);

		// dispatch: delete middleware config
		status &&
			dispatch(
				MiddlewareConfigDelete(config, () => {
					// close dialog
					setOpen(false);

					// dispatch: fetch middleware config
					dispatch(
						MiddlewareConfigFetchList({
							page: 0,
							rowsPerPage:
								middlewareConfig.content?.state?.rowsPerPage ||
								AppConfigService.AppOptions.screens.settings.middlewareConfig.list
									.defaultPageSize,
							reset: MiddlewareConfigResetTypeEnum.RESET
						})
					);
				})
			);
	};

	return (
		<Dialog open={open} onClose={deleteMiddlewareConfig(false)}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={deleteMiddlewareConfig(false)}
					disabled={middlewareConfig.updating}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					color="error"
					variant="outlined"
					onClick={deleteMiddlewareConfig(true)}
					disabled={middlewareConfig.updating}
					endIcon={middlewareConfig.updating && <CircularProgress size={20} />}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogDeleteMiddlewareConfig;
