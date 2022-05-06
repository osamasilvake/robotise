import AdapterDayJS from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	TextField
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import {
	QRCodeCreate,
	QRCodeDelete,
	QRCodesFetch,
	qrCodesSelector
} from '../../../../../../../slices/business/sites/rooms/qrCode/QRCodes.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import {
	dateDayJs,
	dateFormat3,
	dateFormat4,
	dateFormat5,
	dateISOString
} from '../../../../../../../utilities/methods/Date';
import { timeout } from '../../../../../../../utilities/methods/Timeout';
import { SiteParamsInterface } from '../../../../Site.interface';
import QRCodeTemplate from './qr-code-template/QRCodeTemplate';
import {
	DialogGenerateQRCodeFormInterface,
	DialogGenerateQRCodeInterface
} from './SiteRoomsGrid.interface';

const DialogGenerateQRCode: FC<DialogGenerateQRCodeInterface> = (props) => {
	const { open, setOpen, roomState } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const qrCodes = useSelector(qrCodesSelector);

	const [showIframe, setShowIframe] = useState(false);
	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const qrCodeSingle = qrCodes.content?.dataById[roomState.room];
	const translation = 'CONTENT.ROOMS.LIST.GRID.QR_CODE';
	let code = qrCodeSingle?.code;
	let smsTo = qrCodeSingle?.smsTo?.replace('+', '00');
	let smsText = t(`${translation}.SMS_TEXT`, { smsTo, code });

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogGenerateQRCodeFormInterface>(
			{
				room: roomState.room,
				date: dateFormat4(dateDayJs().add(1, 'day').toDate()),
				time: dateFormat5(dateDayJs().hour(12).minute(0).toDate())
			},
			() => ({ room: '', date: '', time: '' }),
			async () => {
				if (!cSiteId) return;

				// payload
				const date = dateFormat4(new Date(values.date));
				const time = dateFormat3(new Date(values.time));
				const payload = {
					room: roomState.room,
					date: dateISOString(new Date(date + ' ' + time)),
					time: values.time
				};

				// dispatch: create QR code
				dispatch(
					QRCodeCreate(cSiteId, payload, (res) => {
						// dispatch: fetch QR codes
						cSiteId &&
							dispatch(QRCodesFetch(cSiteId)).then(() => {
								// generate QR code
								code = res?.code;
								smsTo = res?.smsTo?.replace('+', '00');
								smsText = t(`${translation}.SMS_TEXT`, { smsTo, code });
								handleGenerateQRCode();
							});
					})
				);
			}
		);

	const date = qrCodeSingle?.expirationDate
		? dateFormat4(qrCodeSingle.expirationDate)
		: values.date;
	const time = qrCodeSingle?.expirationDate
		? dateFormat5(qrCodeSingle.expirationDate)
		: values.time;

	/**
	 * generate QR Code
	 */
	const handleGenerateQRCode = async () => {
		// remove iframe
		setShowIframe(false);

		// wait
		await timeout(100);

		// show iframe
		setShowIframe(true);
	};

	/**
	 * delete QR code
	 */
	const handleDeleteQRCode = () => {
		// remove iframe
		setShowIframe(false);

		// dispatch: delete QR code
		cSiteId &&
			qrCodeSingle &&
			dispatch(
				QRCodeDelete(cSiteId, qrCodeSingle, () => {
					// dispatch: fetch QR codes
					cSiteId && dispatch(QRCodesFetch(cSiteId));
				})
			);
	};

	/**
	 * close dialog
	 */
	const onCloseDialog = () => {
		// remove iframe
		setShowIframe(false);

		// close dialog
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={onCloseDialog}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{t(`${translation}.TEXT`, { value: roomState.room })}
				</DialogContentText>

				<FormControl fullWidth margin="normal">
					<TextField
						type="date"
						id="date"
						name="date"
						label={t(`${translation}.FORM.FIELDS.DATE.LABEL`)}
						value={date}
						onChange={handleChangeInput}
						onBlur={handleBlur}
						error={!!errors?.date}
						disabled={!!code}
						InputLabelProps={{ shrink: true }}
					/>
				</FormControl>
				<FormControl fullWidth margin="normal">
					<LocalizationProvider dateAdapter={AdapterDayJS}>
						<TimePicker
							label={t(`${translation}.FORM.FIELDS.TIME.LABEL`)}
							value={time}
							onChange={(e) => {
								handleChangeInput({
									target: {
										name: 'time',
										value: String(e)
									}
								});
							}}
							disabled={!!code}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={onCloseDialog}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				{code && (
					<>
						<Button variant="outlined" onClick={handleGenerateQRCode}>
							{t('DIALOG:BUTTONS.PRINT')}
						</Button>
						<Button
							variant="outlined"
							onClick={handleDeleteQRCode}
							disabled={qrCodes.updating}
							endIcon={qrCodes.updating && <CircularProgress size={20} />}>
							{t('DIALOG:BUTTONS.DELETE')}
						</Button>
					</>
				)}
				{!code && (
					<Button
						type="submit"
						variant="outlined"
						onClick={handleSubmit}
						disabled={qrCodes.updating}
						endIcon={qrCodes.updating && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.CREATE')}
					</Button>
				)}
			</DialogActions>

			{/* QR Code Template */}
			<QRCodeTemplate
				text={smsText}
				iframeId="qr-code"
				iframeUrl="/assets/templates/qr-code/qrCode.html"
				showIframe={showIframe}
			/>
		</Dialog>
	);
};
export default DialogGenerateQRCode;
