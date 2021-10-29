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
	DeepLinkDelete,
	DeepLinksFetchList,
	deepLinksSelector
} from '../../../../../slices/settings/deep-links/DeepLinks.slice';
import { DeepLinkResetTypeEnum } from './DeepLinksTable.enum';
import { DialogDeleteDeepLinkInterface } from './DeepLinksTable.interface';

const DialogDeleteDeepLink: FC<DialogDeleteDeepLinkInterface> = (props) => {
	const { deepLink, open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'DEEP_LINKS']);

	const dispatch = useDispatch();
	const deepLinks = useSelector(deepLinksSelector);

	const translation = 'DEEP_LINKS:LIST.ACTIONS.DELETE';

	/**
	 * delete deep link
	 * @param status
	 * @returns
	 */
	const deleteDeepLink = (status: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		!status && setOpen(false);

		// dispatch: delete deep link
		status &&
			dispatch(
				DeepLinkDelete(deepLink, () => {
					// close dialog
					setOpen(false);

					// dispatch: fetch deep links
					dispatch(
						DeepLinksFetchList({
							page: 0,
							rowsPerPage:
								deepLinks.content?.state?.rowsPerPage ||
								AppConfigService.AppOptions.screens.settings.deepLinks.list
									.defaultPageSize,
							reset: DeepLinkResetTypeEnum.RESET
						})
					);
				})
			);
	};

	return (
		<Dialog open={open} onClose={deleteDeepLink(false)}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={deleteDeepLink(false)}
					disabled={deepLinks.updating}>
					{t('BUTTONS.CANCEL')}
				</Button>
				<Button
					color="error"
					variant="outlined"
					onClick={deleteDeepLink(true)}
					disabled={deepLinks.updating}
					endIcon={deepLinks.updating && <CircularProgress size={20} />}>
					{t('BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogDeleteDeepLink;
