import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../../../slices';
import {
	QRCodeDelete,
	QRCodesFetch,
	qrCodesSelector
} from '../../../../../../../../slices/business/sites/rooms/qrCode/QRCodes.slice';
import { DialogDeleteConfirmationInterface } from './SiteRoomsQRCode.interface';

const DialogDeleteConfirmation: FC<DialogDeleteConfirmationInterface> = (props) => {
	const { open, setOpen, currentState, setCurrentState, cSiteId, qrCodeSingle } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const qrCodes = useSelector(qrCodesSelector);

	const translation = 'CONTENT.ROOMS.LIST.GRID.QR_CODE.CONFIRMATION';

	/**
	 * delete QR code
	 */
	const handleDeleteQRCode = () => {
		// set state
		setCurrentState({ status: false, type: currentState.type });

		// dispatch: delete QR code
		cSiteId &&
			qrCodeSingle &&
			dispatch(
				QRCodeDelete(cSiteId, qrCodeSingle, () => {
					// set open
					setOpen(false);

					// dispatch: fetch QR codes
					cSiteId && dispatch(QRCodesFetch(cSiteId));
				})
			);
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>{t(`${translation}.TEXT`)}</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					color="error"
					variant="outlined"
					onClick={handleDeleteQRCode}
					disabled={qrCodes.updating}
					endIcon={qrCodes.updating && <CircularProgress size={20} />}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogDeleteConfirmation;
