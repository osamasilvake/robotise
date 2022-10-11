import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SiteConfigurationConfirmationTypeEnum } from './SiteConfiguration.enum';
import { DialogSiteConfigurationConfirmationInterface } from './SiteConfiguration.interface';

const DialogSiteConfigurationConfirmation: FC<DialogSiteConfigurationConfirmationInterface> = (
	props
) => {
	const { open, setOpen, setFormDirty } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const translation = 'CONTENT.CONFIGURATION.SITE_CONFIGURATION.CONFIRMATION';

	/**
	 * confirm modal
	 * @returns
	 */
	const onConfirm = () => {
		// set dirty
		setFormDirty(false);

		// close dialog
		setOpen(SiteConfigurationConfirmationTypeEnum.CONFIRM);
	};

	return (
		<Dialog
			open={open === SiteConfigurationConfirmationTypeEnum.OPEN}
			onClose={() => setOpen(SiteConfigurationConfirmationTypeEnum.CANCEL)}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={() => setOpen(SiteConfigurationConfirmationTypeEnum.CANCEL)}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button variant="outlined" onClick={onConfirm}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogSiteConfigurationConfirmation;
