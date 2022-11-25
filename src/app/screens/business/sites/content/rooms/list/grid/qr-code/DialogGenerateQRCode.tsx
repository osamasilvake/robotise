import {
	Box,
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../../slices';
import {
	QRCodeCreate,
	QRCodesFetch,
	qrCodesSelector
} from '../../../../../../../../slices/business/sites/rooms/qrCode/QRCodes.slice';
import { useForm } from '../../../../../../../../utilities/hooks/form/UseForm';
import {
	dateDayJs,
	dateFormat3,
	dateFormat4,
	dateFormat5,
	dateISOString
} from '../../../../../../../../utilities/methods/Date';
import { formatPhoneNumber } from '../../../../../../../../utilities/methods/Number';
import { timeout } from '../../../../../../../../utilities/methods/Timeout';
import { SiteParamsInterface } from '../../../../../Site.interface';
import { SiteRoomsGridStyle } from '../SiteRoomsGrid.style';
import DialogDeleteConfirmation from './DialogDeleteConfirmation';
import { QRCodeTemplateEnumType } from './SiteRoomsQRCode.enum';
import {
	DialogGenerateQRCodeFormInterface,
	DialogGenerateQRCodeInterface
} from './SiteRoomsQRCode.interface';
import SiteRoomsTemplateQRCode from './SiteRoomsTemplateQRCode';

const DialogGenerateQRCode: FC<DialogGenerateQRCodeInterface> = (props) => {
	const { open, setOpen, roomState, siteSingle } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);
	const classes = SiteRoomsGridStyle();

	const dispatch = useDispatch<AppDispatch>();
	const qrCodes = useSelector(qrCodesSelector);

	const [deleteQR, setDeleteQR] = useState(false);
	const [currentState, setCurrentState] = useState({
		status: false,
		type: QRCodeTemplateEnumType.QR
	});
	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const qrCodeSingle = qrCodes.content?.dataById[roomState.room];
	const translation = 'CONTENT.ROOMS.LIST.GRID.QR_CODE';
	let code = qrCodeSingle?.code || '';
	let smsTo = qrCodeSingle?.smsTo?.replace('+', '00') || '';
	let smsText = t(`${translation}.SMS_TEXT`, { smsTo, code });
	const smsToBeautified = formatPhoneNumber(qrCodeSingle?.smsTo || '');
	const codeBeautified = `jj${code}`;
	const room = qrCodeSingle?.room || '';

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
	 * @param type
	 * @returns
	 */
	const handleGenerateQRCode = (type?: QRCodeTemplateEnumType) => async () => {
		// set state
		setCurrentState({ status: false, type: type || currentState.type });

		// wait
		await timeout(100);

		// set state
		setCurrentState({ status: true, type: type || currentState.type });
	};

	/**
	 * close dialog
	 */
	const onCloseDialog = () => {
		// set state
		setCurrentState({ status: false, type: currentState.type });

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
					<LocalizationProvider dateAdapter={AdapterDayjs}>
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

				{code && (
					<Box className={classes.sButtons}>
						<Button
							variant="outlined"
							fullWidth
							onClick={handleGenerateQRCode(QRCodeTemplateEnumType.QR_IMAGE)}>
							{t(`${translation}.FORM.BUTTONS.DOWNLOAD_QR_IMAGE`)}
						</Button>
						<Button
							variant="outlined"
							fullWidth
							onClick={handleGenerateQRCode(QRCodeTemplateEnumType.QR)}
							className={classes.sButtonGap}>
							{t(`${translation}.FORM.BUTTONS.PRINT_MARKETING_QR`)}
						</Button>
						<Button
							variant="outlined"
							fullWidth
							onClick={handleGenerateQRCode(QRCodeTemplateEnumType.QR_MINIMAL)}>
							{t(`${translation}.FORM.BUTTONS.PRINT_MINIMAL_QR`)}
						</Button>
						<Button
							fullWidth
							color="error"
							variant="outlined"
							onClick={() => setDeleteQR(true)}
							className={classes.sButtonGap}>
							{t('DIALOG:BUTTONS.DELETE')}
						</Button>
					</Box>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={onCloseDialog}>
					{t('DIALOG:BUTTONS.GO_BACK')}
				</Button>
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

			{/* Template: QR Code */}
			<SiteRoomsTemplateQRCode
				text={smsText}
				code={codeBeautified}
				room={room}
				smsTo={smsToBeautified}
				siteTitle={siteSingle.title}
				iframeId="qr-code"
				iframeUrl={
					currentState.type === QRCodeTemplateEnumType.QR
						? '/assets/templates/qr-code/qrCode.html'
						: '/assets/templates/qr-code-minimal/qrCodeMinimal.html'
				}
				currentState={currentState}
			/>

			{/* Dialog: Accept Orders */}
			{deleteQR && cSiteId && qrCodeSingle && (
				<DialogDeleteConfirmation
					open={deleteQR}
					setOpen={setDeleteQR}
					currentState={currentState}
					setCurrentState={setCurrentState}
					cSiteId={cSiteId}
					qrCodeSingle={qrCodeSingle}
				/>
			)}
		</Dialog>
	);
};
export default DialogGenerateQRCode;
