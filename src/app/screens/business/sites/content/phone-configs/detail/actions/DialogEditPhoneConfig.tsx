import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import {
	GeneralFetchOrderModes,
	generalOperationsSelector
} from '../../../../../../../slices/business/general/GeneralOperations.slice';
import {
	PhoneConfigEdit,
	PhoneConfigsFetch,
	phoneConfigsSelector
} from '../../../../../../../slices/business/sites/phone-configs/PhoneConfigs.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObj } from '../../../../../../../utilities/methods/Object';
import { SiteParamsInterface } from '../../../../Site.interface';
import { SiteEditConfigModeTypeEnum } from '../general/SitePhoneConfigsGeneral.enum';
import { SitePhoneConfigsPhoneNumbersTypeEnum } from '../SitePhoneConfigsDetail.enum';
import { EditPhoneConfigValidation } from './DialogEditPhoneConfig.validation';
import { SitePhoneConfigsDetailActionsStyle } from './SitePhoneConfigsDetailActions.style';
import {
	DialogEditPhoneConfigFormInterface,
	DialogEditPhoneConfigInterface
} from './SitePhoneConfigsEdit.interface';

const DialogEditPhoneConfig: FC<DialogEditPhoneConfigInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);
	const classes = SitePhoneConfigsDetailActionsStyle();

	const dispatch = useDispatch<AppDispatch>();
	const generalOperations = useSelector(generalOperationsSelector);
	const phoneConfigs = useSelector(phoneConfigsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const orderModesList = generalOperations.orderModes.content?.data?.map((m) => m.mode);
	const phoneConfig = phoneConfigs.content?.data[0];
	const roomsMapping = Object.entries(phoneConfig?.roomsMapping || {})
		.map(([key, value]) => `${key}:${value}`)
		.join(', ');
	const phoneNumbers = phoneConfigs?.content?.phoneNumbers;
	const fromList = phoneNumbers && phoneNumbers[SitePhoneConfigsPhoneNumbersTypeEnum.VOICE];
	const smsList = phoneNumbers && phoneNumbers[SitePhoneConfigsPhoneNumbersTypeEnum.SMS];
	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.ACTIONS.EDIT';

	const { handleChangeInput, handleChangeSelect, handleBlur, handleSubmit, values, errors } =
		useForm<DialogEditPhoneConfigFormInterface>(
			{
				mode: phoneConfig?.mode || SiteEditConfigModeTypeEnum.MINI_BAR,
				prefixes: phoneConfig?.prefixes?.join(', ') || '',
				from: phoneConfig?.from || '',
				roomsMapping: roomsMapping || '',
				outboundPattern: phoneConfig?.sip?.outboundPattern || '',
				callbackRetries: String(phoneConfig?.callbackRetries) || '0',
				smsGateway: phoneConfig?.smsGateway || '',
				smsMessages: phoneConfig?.smsMessages
			},
			EditPhoneConfigValidation,
			async () => {
				// rooms mapping
				const splitRoomsMapping = String(values.roomsMapping || '')
					.split(',')
					.map((e: string) => e.trim());
				const mappingsOutput = splitRoomsMapping.reduce(
					(obj, item) => Object.assign(obj, { [item.split(':')[0]]: item.split(':')[1] }),
					{}
				);

				// dispatch: edit phone config
				phoneConfig?.id &&
					dispatch(
						PhoneConfigEdit(
							phoneConfig.id,
							{ ...values, roomsMapping: mappingsOutput },
							() => {
								// dispatch: fetch site phone configs
								dispatch(PhoneConfigsFetch(cSiteId, true));

								// close dialog
								setOpen(false);
							}
						)
					);
			}
		);

	useEffect(() => {
		// return if content
		if (generalOperations.orderModes.content !== null) return;

		// dispatch: fetch order modes
		dispatch(GeneralFetchOrderModes());
	}, [dispatch, generalOperations.orderModes.content]);

	// wait for order modes content to load
	if (!generalOperations.orderModes.content) return null;

	return (
		<>
			<Dialog open={open} onClose={() => setOpen(false)} fullWidth>
				<form onSubmit={handleSubmit}>
					<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
					<DialogContent>
						<DialogContentText>{t(`${translation}.EXCERPT`)}</DialogContentText>

						<FormControl fullWidth margin="normal">
							<TextField
								required
								type="string"
								id="prefixes"
								name="prefixes"
								label={t(`${translation}.FIELDS.PREFIXES.LABEL`)}
								placeholder={t(`${translation}.FIELDS.PREFIXES.PLACEHOLDER`)}
								value={values?.prefixes}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								error={!!errors?.prefixes}
								helperText={errors?.prefixes && t(errors.prefixes)}
							/>
						</FormControl>

						{fromList && (
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-from">
									{t(`${translation}.FIELDS.FROM.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-from"
									id="from"
									name="from"
									label={t(`${translation}.FIELDS.FROM.LABEL`)}
									value={values.from}
									onChange={handleChangeSelect}>
									{fromList?.map((from) => (
										<MenuItem key={from.id} value={from.phoneNumber}>
											{from.phoneNumber} - {from.friendlyName} (
											{from?.address?.isoCountry})
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}

						<FormControl fullWidth margin="normal">
							<TextField
								multiline
								type="string"
								id="roomsMapping"
								name="roomsMapping"
								rows={3}
								label={t(`${translation}.FIELDS.ROOMS_MAPPING.LABEL`)}
								placeholder={t(`${translation}.FIELDS.ROOMS_MAPPING.PLACEHOLDER`)}
								value={values?.roomsMapping}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								error={!!errors?.roomsMapping}
								helperText={
									errors?.roomsMapping && t(errors.roomsMapping as string)
								}
							/>
						</FormControl>

						<Grid container spacing={1}>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth margin="normal">
									<InputLabel id="label-mode">
										{t(`${translation}.FIELDS.MODE.LABEL`)}
									</InputLabel>
									<Select
										labelId="label-mode"
										id="mode"
										name="mode"
										label={t(`${translation}.FIELDS.MODE.LABEL`)}
										value={values.mode}
										onChange={handleChangeSelect}>
										{(orderModesList || [])?.map((m) => (
											<MenuItem key={m} value={m}>
												{t(`GENERAL:COMMON.MODE.${m}`)}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl fullWidth margin="normal">
									<TextField
										required
										type="number"
										id="callbackRetries"
										name="callbackRetries"
										label={t(`${translation}.FIELDS.CALLBACK_RETRIES.LABEL`)}
										placeholder={t(
											`${translation}.FIELDS.CALLBACK_RETRIES.PLACEHOLDER`
										)}
										value={values.callbackRetries}
										onChange={handleChangeInput}
										onBlur={handleBlur}
										error={!!errors?.callbackRetries}
										helperText={
											errors &&
											typeof errors.callbackRetries === 'string' &&
											t(errors.callbackRetries)
										}
										InputProps={{ inputProps: { min: 0, max: 10 } }}
									/>
								</FormControl>
							</Grid>
						</Grid>

						{smsList && (
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-smsGateway">
									{t(`${translation}.FIELDS.SMS_GATEWAY.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-smsGateway"
									id="smsGateway"
									name="smsGateway"
									label={t(`${translation}.FIELDS.SMS_GATEWAY.LABEL`)}
									value={values.smsGateway}
									onChange={handleChangeSelect}>
									{smsList?.map((from) => (
										<MenuItem key={from.id} value={from.phoneNumber}>
											{from.phoneNumber}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}

						<Typography variant="body2" className={classes.sSipTitle}>
							SIP Config
						</Typography>

						<FormControl fullWidth>
							<TextField
								type="string"
								id="outboundPattern"
								name="outboundPattern"
								label={t(`${translation}.FIELDS.OUTBOUND_PATTERN.LABEL`)}
								placeholder={t(
									`${translation}.FIELDS.OUTBOUND_PATTERN.PLACEHOLDER`
								)}
								value={values?.outboundPattern}
								onChange={handleChangeInput}
								onBlur={handleBlur}
							/>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button variant="outlined" onClick={() => setOpen(false)}>
							{t('DIALOG:BUTTONS.CANCEL')}
						</Button>
						<Button
							variant="outlined"
							type="submit"
							disabled={
								phoneConfigs.updating || (!!errors && !validateEmptyObj(errors))
							}
							endIcon={phoneConfigs.updating && <CircularProgress size={20} />}>
							{t('DIALOG:BUTTONS.UPDATE')}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default DialogEditPhoneConfig;
