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
import { FC, MouseEvent } from 'react';
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
import { roomsSelector } from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { RoomsTypeEnum } from '../../../../../../../slices/business/sites/rooms/Rooms.slice.enum';
import { sitesSelector } from '../../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { CreateOrderValidation } from './DialogCreateOrder.validation';
import {
	RobotOrderCustomNotificationTypeEnum,
	RobotOrderModeTypeEnum
} from './RobotOrdersActions.enum';
import {
	DialogCreateOrderFormInterface,
	DialogCreateOrderInterface
} from './RobotOrdersActions.interface';
import { RobotOrdersActionsStyle } from './RobotOrdersActions.style';

const DialogCreateOrder: FC<DialogCreateOrderInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'GENERAL']);
	const classes = RobotOrdersActionsStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const roomsGroupBy = rooms.content?.groupByType;
	const rLocations = roomsGroupBy?.find((r) => r.key === RoomsTypeEnum.ROOM)?.values || [];
	const sLocations = roomsGroupBy?.find((r) => r.key === RoomsTypeEnum.SERVICE)?.values || [];

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const configs = cSiteId && sites.content?.dataById[cSiteId]?.configs;
	const orderModes = configs && configs.availableOrderModes;
	const defaultOrderMode = configs && configs.defaultOrderMode;
	const customerNotificationTypesEnabled = configs && configs.customerNotificationTypesEnabled;
	const onlyPhoneRoom =
		customerNotificationTypesEnabled?.length === 1 &&
		customerNotificationTypesEnabled[0] === RobotOrderCustomNotificationTypeEnum.PHONE_ROOM;
	const translation = 'GENERAL:COMMON.ORDERS';
	const fieldLocation = 'locationId';

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
			locationId: '',
			mode: defaultOrderMode || RobotOrderModeTypeEnum.MINI_BAR,
			type: '',
			phone: ''
		},
		CreateOrderValidation,
		async () => {
			const defaultType = customerNotificationTypesEnabled?.length
				? customerNotificationTypesEnabled[0]
				: '';
			const phoneRoom = values.type === RobotOrderCustomNotificationTypeEnum.PHONE_ROOM;
			const payload = {
				isDebug: values.isDebug,
				locationId: values.locationId,
				mode: values.mode,
				customerNotification: {
					phoneNumber: phoneRoom ? '' : values.phone,
					notificationTypes: [values.type || defaultType]
				}
			};

			// dispatch: create an order
			cSiteId &&
				cRobotId &&
				dispatch(
					OrderCreate(cSiteId, cRobotId, payload, () => {
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
	const phoneCustomer = type === RobotOrderCustomNotificationTypeEnum.PHONE_CUSTOMER;
	const smsCustomer = type === RobotOrderCustomNotificationTypeEnum.SMS_CUSTOMER;

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
							{t(`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.MODE.LABEL`)}
						</InputLabel>
						<Select
							required
							labelId="label-mode"
							id="mode"
							name="mode"
							label={t(`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.MODE.LABEL`)}
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
							<InputLabel id="label-room-locations">
								{t(
									`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.ROOM_LOCATIONS.LABEL`
								)}
							</InputLabel>
							<Select
								required
								labelId="label-room-locations"
								id={fieldLocation}
								name={fieldLocation}
								label={t(
									`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.ROOM_LOCATIONS.LABEL`
								)}
								value={values.locationId}
								onChange={handleChangeSelect}>
								{rLocations.map((location) => (
									<MenuItem key={location.id} value={location.id}>
										{location.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					{values.mode === RobotOrderModeTypeEnum.SERVICE_POSITION && (
						<FormControl fullWidth margin="normal">
							<InputLabel id="label-service-locations">
								{t(
									`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.SERVICE_LOCATIONS.LABEL`
								)}
							</InputLabel>
							<Select
								required
								labelId="label-service-locations"
								id={fieldLocation}
								name={fieldLocation}
								label={t(
									`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.SERVICE_LOCATIONS.LABEL`
								)}
								value={values.locationId}
								onChange={handleChangeSelect}>
								{sLocations.map((location) => (
									<MenuItem key={location.id} value={location.id}>
										{location.name}
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
						label={t<string>(
							`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.DEBUG.LABEL`
						)}
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
										`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.CUSTOMER_NOTIFICATION_TYPES.LABEL`
									)}
								</InputLabel>
								<Select
									labelId="label-type"
									id="type"
									name="type"
									label={t(
										`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.CUSTOMER_NOTIFICATION_TYPES.LABEL`
									)}
									value={type}
									onChange={handleChangeSelect}>
									{customerNotificationTypesEnabled.map((n) => (
										<MenuItem key={n} value={n}>
											{t(
												`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.CUSTOMER_NOTIFICATION_TYPES.OPTIONS.${n}`
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
											`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.PHONE.LABEL`
										)}
										placeholder={t(
											`${translation}.LIST.ACTIONS.CREATE.FORM.FIELDS.PHONE.PLACEHOLDER`
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
						disabled={
							orders.updating ||
							!values.locationId ||
							!!errors?.locationId ||
							!!errors?.phone
						}
						endIcon={orders.updating && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.CREATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateOrder;
