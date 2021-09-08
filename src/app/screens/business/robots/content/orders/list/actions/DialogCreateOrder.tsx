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
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@material-ui/core';
import { FC, MouseEvent } from 'react';
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
import { siteSelector } from '../../../../../../../slices/business/sites/Site.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { CreateOrderValidation } from './DialogCreateOrder.validation';
import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';
import {
	DialogCreateOrderFormInterface,
	DialogCreateOrderInterface
} from './RobotOrdersActions.interface';
import { orderModes } from './RobotOrdersActions.map';

const DialogCreateOrder: FC<DialogCreateOrderInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'ROBOTS']);

	const dispatch = useDispatch();
	const site = useSelector(siteSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const params: RobotParamsInterface = useParams();

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const translation = 'ROBOTS:CONTENT.ORDERS';
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
			mode: RobotOrderModeTypeEnum.MINI_BAR
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

	/**
	 * close create order dialog
	 * @param event
	 */
	const closeCreateOrderDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={closeCreateOrderDialog}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t(`${translation}.LIST.ACTIONS.CREATE.TITLE`)}</DialogTitle>
				<DialogContent>
					<Typography color="textSecondary">
						{t(`${translation}.LIST.ACTIONS.CREATE.TEXT`)}
					</Typography>

					{values.mode !== RobotOrderModeTypeEnum.SERVICE_POSITION && (
						<FormControl error fullWidth margin="normal">
							<TextField
								required
								type="number"
								id={fieldLocation}
								name={fieldLocation}
								value={values.location}
								error={!!errors?.location}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								label={t(
									`${translation}.LIST.ACTIONS.CREATE.FIELDS.LOCATION.LABEL`
								)}
								placeholder={t(
									`${translation}.LIST.ACTIONS.CREATE.FIELDS.LOCATION.PLACEHOLDER`
								)}
								InputProps={{ inputProps: { min: 0 } }}
							/>
							{errors?.location && (
								<FormHelperText>{t(errors.location)}</FormHelperText>
							)}
						</FormControl>
					)}

					{values.mode === RobotOrderModeTypeEnum.SERVICE_POSITION && (
						<FormControl fullWidth margin="normal">
							<InputLabel id="service-positions">
								{t(
									`${translation}.LIST.ACTIONS.CREATE.FIELDS.SERVICE_POSITIONS.LABEL`
								)}
							</InputLabel>
							<Select
								required
								labelId="service-positions"
								id="service-positions"
								name={fieldLocation}
								value={values.location}
								onChange={handleChangeSelect}
								label={t(
									`${translation}.LIST.ACTIONS.CREATE.FIELDS.SERVICE_POSITIONS.LABEL`
								)}>
								{site.servicePositions.content?.data.map((position) => (
									<MenuItem key={position.id} value={position.location}>
										{position.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					<FormControl fullWidth margin="normal">
						<InputLabel id="mode">
							{t(`${translation}.LIST.ACTIONS.CREATE.FIELDS.MODE.LABEL`)}
						</InputLabel>
						<Select
							required
							labelId="mode"
							id="mode"
							name="mode"
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
							onBlur={handleBlur}
							label={t(`${translation}.LIST.ACTIONS.CREATE.FIELDS.MODE.LABEL`)}>
							{orderModes().map((mode) => (
								<MenuItem
									key={mode}
									value={mode}
									disabled={
										mode === RobotOrderModeTypeEnum.SERVICE_POSITION &&
										site.servicePositions.content?.data.length === 0
									}>
									{t(`${translation}.COMMON.MODE.${mode}`)}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									name="isDebug"
									onChange={handleChangeCheckbox}
								/>
							}
							label={t(`${translation}.LIST.ACTIONS.CREATE.FIELDS.DEBUG.LABEL`)}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeCreateOrderDialog}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={orders.updating || !values.location}
						endIcon={orders.updating && <CircularProgress size={20} />}>
						{t('BUTTONS.CREATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateOrder;
