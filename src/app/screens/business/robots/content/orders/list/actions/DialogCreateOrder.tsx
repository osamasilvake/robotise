import {
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
import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';
import {
	DialogCreateOrderFormInterface,
	DialogCreateOrderInterface
} from './RobotOrdersActions.interface';

const DialogCreateOrder: FC<DialogCreateOrderInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['ROBOTS', 'DIALOG', 'GENERAL']);

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const servicePositions = useSelector(servicePositionsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const pServicePositionSiteId = servicePositions.content?.state?.pSiteId;
	const orderModes = cSiteId && sites.content?.dataById[cSiteId]?.configs.availableOrderModes;
	const defaultOrderMode = cSiteId && sites.content?.dataById[cSiteId]?.configs.defaultOrderMode;
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
			mode: defaultOrderMode || RobotOrderModeTypeEnum.MINI_BAR
		},
		CreateOrderValidation,
		async () => {
			// dispatch: create an order
			cSiteId &&
				dispatch(
					OrderCreate(cSiteId, values, () => {
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
							}}
							onBlur={handleBlur}>
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
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeDialog}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={orders.updating || !values.location}
						endIcon={orders.updating && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.CREATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateOrder;
