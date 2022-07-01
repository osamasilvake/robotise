import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { FC, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import {
	OrderCreate,
	ordersSelector,
	OrderUpdateState
} from '../../../../../../../slices/business/robots/orders/Orders.slice';
import { SOCStateInterface } from '../../../../../../../slices/business/robots/orders/Orders.slice.interface';
import { robotTwinsSummarySelector } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	ServicePositionsFetchList,
	servicePositionsSelector
} from '../../../../../../../slices/business/sites/configuration/ServicePositions.slice';
import { sitesSelector } from '../../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { CreateOrderValidation } from './DialogCreateOrder.validation';
import { RobotCustomNotificationTypeEnum, RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';
import {
	DialogCreateOrderFormInterface,
	DialogCreateOrderInterface
} from './RobotOrdersActions.interface';
import { RobotOrdersActionsStyle } from './RobotOrdersActions.style';

const DialogCreateOrder: FC<DialogCreateOrderInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['ROBOTS', 'DIALOG', 'GENERAL']);
	const classes = RobotOrdersActionsStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const servicePositions = useSelector(servicePositionsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const pServicePositionSiteId = servicePositions.content?.state?.pSiteId;
	const configs = cSiteId && sites.content?.dataById[cSiteId]?.configs;
	const orderModes = configs && configs.availableOrderModes;
	const defaultOrderMode = configs && configs.defaultOrderMode;
	const customerNotificationTypesEnabled = configs && configs.customerNotificationTypesEnabled;
	const onlyPhoneRoom =
		customerNotificationTypesEnabled?.length === 1 &&
		customerNotificationTypesEnabled[0] === RobotCustomNotificationTypeEnum.PHONE_ROOM;
	const translation = 'CONTENT.ORDERS';
	const fieldLocation = 'location';

	const {
		handleChangeInput,
		handleChangeCheckbox,
		handleChangeSelect,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<DialogCreateOrderFormInterface>(
		{
			isDebug: false,
			location: '',
			mode: defaultOrderMode || RobotOrderModeTypeEnum.MINI_BAR,
			type: '',
			phone: ''
		},
		CreateOrderValidation,
		async () => {
			const defaultType = customerNotificationTypesEnabled?.length
				? customerNotificationTypesEnabled[0]
				: '';
			const phoneRoom = values.type === RobotCustomNotificationTypeEnum.PHONE_ROOM;
			const payload = {
				isDebug: values.isDebug,
				location: values.location,
				mode: values.mode,
				customerNotification: {
					phoneNumber: phoneRoom ? '' : values.phone,
					notificationTypes: [values.type || defaultType]
				}
			};

			// dispatch: create an order
			cSiteId &&
				dispatch(
					OrderCreate(cSiteId, payload, () => {
						// close dialog
						setOpen(false);

						// dispatch: update state
						const state: SOCStateInterface = {
							...orders.content?.state,
							page: 0
						};
						dispatch(OrderUpdateState(state));
					})
				);
		}
	);

	const types0 = customerNotificationTypesEnabled && customerNotificationTypesEnabled[0];
	const type = values.type || types0;
	const phoneCustomer = type === RobotCustomNotificationTypeEnum.PHONE_CUSTOMER;
	const smsCustomer = type === RobotCustomNotificationTypeEnum.SMS_CUSTOMER;

	useEffect(() => {
		// validate mode: service-position
		const exist = (orderModes || []).some((m) => m === RobotOrderModeTypeEnum.SERVICE_POSITION);
		if (!exist) return;

		if (pServicePositionSiteId === cSiteId) return;

		// dispatch: fetch service positions
		cSiteId && dispatch(ServicePositionsFetchList(cSiteId));
	}, [dispatch, pServicePositionSiteId, cSiteId, orderModes]);

	/**
	 * close dialog
	 * @param event
	 */
	const closeDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={closeDialog}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t(`${translation}.LIST.ACTIONS.CREATE.TITLE`)}</DialogTitle>
				<DialogContent>
					<Typography color="textSecondary">
						{t(`${translation}.LIST.ACTIONS.CREATE.TEXT`)}
					</Typography>

					<FormControl fullWidth margin="normal">
						<InputLabel id="label-mode">
							{t(`${translation}.LIST.ACTIONS.CREATE.FIELDS.MODE.LABEL`)}
						</InputLabel>
						<Select
							required
							labelId="label-mode"
							id="mode"
							name="mode"
							label={t(`${translation}.LIST.ACTIONS.CREATE.FIELDS.MODE.LABEL`)}
							value={values.mode}
							onChange={(e) => {
								handleChangeInput({
									target: {
										name: fieldLocation,
										value: ''
									}
								});
								handleChangeSelect(e);
							}}>
							{(orderModes || [])?.map((m) => (
								<MenuItem key={m} value={m}>
									{t(`GENERAL:COMMON.MODE.${m}`)}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{values.mode !== RobotOrderModeTypeEnum.SERVICE_POSITION && (
						<FormControl fullWidth margin="normal">
							<TextField
								required
								type="number"
								id={fieldLocation}
								name={fieldLocation}
								label={t(
									`${translation}.LIST.ACTIONS.CREATE.FIELDS.LOCATION.LABEL`
								)}
								placeholder={t(
									`${translation}.LIST.ACTIONS.CREATE.FIELDS.LOCATION.PLACEHOLDER`
								)}
								value={values.location}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								error={!!errors?.location}
								helperText={errors?.location && t(errors.location)}
								InputProps={{ inputProps: { min: 0 } }}
							/>
						</FormControl>
					)}

					{values.mode === RobotOrderModeTypeEnum.SERVICE_POSITION && (
						<FormControl fullWidth margin="normal">
							<InputLabel id="label-service-positions">
								{t(
									`${translation}.LIST.ACTIONS.CREATE.FIELDS.SERVICE_POSITIONS.LABEL`
								)}
							</InputLabel>
							<Select
								required
								labelId="label-service-positions"
								id={fieldLocation}
								name={fieldLocation}
								label={t(
									`${translation}.LIST.ACTIONS.CREATE.FIELDS.SERVICE_POSITIONS.LABEL`
								)}
								value={values.location}
								onChange={handleChangeSelect}>
								{servicePositions.content?.data.map((position) => (
									<MenuItem key={position.id} value={position.location}>
										{position.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								name="isDebug"
								onChange={handleChangeCheckbox}
							/>
						}
						label={t<string>(`${translation}.LIST.ACTIONS.CREATE.FIELDS.DEBUG.LABEL`)}
					/>

					{/* Notification Types */}
					{customerNotificationTypesEnabled && !onlyPhoneRoom && (
						<Box className={classes.sNotificationTypes}>
							<Typography color="textSecondary">
								{t(`${translation}.LIST.ACTIONS.CREATE.NOTIFICATION_TYPES`)}
							</Typography>

							<FormControl fullWidth margin="normal">
								<InputLabel id="label-type">
									{t(
										`${translation}.LIST.ACTIONS.CREATE.FIELDS.CUSTOMER_NOTIFICATION_TYPES.LABEL`
									)}
								</InputLabel>
								<Select
									labelId="label-type"
									id="type"
									name="type"
									label={t(
										`${translation}.LIST.ACTIONS.CREATE.FIELDS.CUSTOMER_NOTIFICATION_TYPES.LABEL`
									)}
									value={type}
									onChange={handleChangeSelect}>
									{customerNotificationTypesEnabled.map((n) => (
										<MenuItem key={n} value={n}>
											{t(
												`${translation}.LIST.ACTIONS.CREATE.FIELDS.CUSTOMER_NOTIFICATION_TYPES.OPTIONS.${n}`
											)}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							{(phoneCustomer || smsCustomer) && (
								<FormControl fullWidth margin="normal">
									<TextField
										required
										type="string"
										id="phone"
										name="phone"
										label={t(
											`${translation}.LIST.ACTIONS.CREATE.FIELDS.PHONE.LABEL`
										)}
										placeholder={t(
											`${translation}.LIST.ACTIONS.CREATE.FIELDS.PHONE.PLACEHOLDER`
										)}
										value={values.phone}
										onChange={handleChangeInput}
										onBlur={handleBlur}
										error={!!errors?.phone}
										helperText={errors?.phone && t(errors.phone)}
									/>
								</FormControl>
							)}
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeDialog}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={orders.updating || !values.location || !!errors?.phone}
						endIcon={orders.updating && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.CREATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateOrder;
