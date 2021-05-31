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
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import {
	OrderCreate,
	ordersSelector,
	OrderUpdateState
} from '../../../../../../../slices/orders/Orders.slice';
import { SOCState } from '../../../../../../../slices/orders/Orders.slice.interface';
import { robotSelector } from '../../../../../../../slices/robot/Robot.slice';
import { robotTwinsSummarySelector } from '../../../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../../../slices/sites/Sites.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { CreateOrderValidation } from './DialogCreateOrder.validation';
import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';
import {
	DialogCreateOrderInterface,
	DialogCreateOrderPayloadInterface
} from './RobotOrdersActions.interface';
import { orderModes } from './RobotOrdersActions.map';

const DialogCreateOrder: FC<DialogCreateOrderInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'ROBOTS']);

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robot = useSelector(robotSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const [position, setPosition] = useState('');

	const params: RobotParamsInterface = useParams();
	const common = 'ROBOTS:CONTENT.ORDERS.LIST.ACTIONS.CREATE';
	const siteId = robotTwinsSummary.content?.dataById[params.robot]?.site.id;
	const acceptOrders = siteId && sites.content?.dataById[siteId].acceptOrders;
	const regexOnlyNumbers = AppConfigService.AppOptions.regex.onlyNumbers;

	const {
		handleChangeInput,
		handleChangeCheckbox,
		handleChangeSelect,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<DialogCreateOrderPayloadInterface>(
		{
			isDebug: false,
			location: '',
			mode: RobotOrderModeTypeEnum.MINI_BAR
		},
		CreateOrderValidation,
		async () => {
			// dispatch: create an order
			siteId &&
				Promise.all([dispatch(OrderCreate(values, siteId))]).then(() => {
					// set open
					setOpen(false);

					// dispatch: update state
					const payload: SOCState = {
						...orders.content?.state,
						page: 0
					};
					dispatch(OrderUpdateState(payload));
				});
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
				<DialogTitle>{t(`${common}.TITLE`)}</DialogTitle>
				<DialogContent>
					<Typography variant="body1" color="textSecondary">
						{t(`${common}.TEXT`)}
					</Typography>

					{values.mode !== RobotOrderModeTypeEnum.SERVICE_POSITION && (
						<FormControl error fullWidth margin="normal">
							<TextField
								required
								variant="outlined"
								type="number"
								id="location"
								name="location"
								error={!!errors?.location}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								label={t(`${common}.FIELDS.LOCATION.LABEL`)}
								placeholder={t(`${common}.FIELDS.LOCATION.PLACEHOLDER`)}
								InputProps={{ inputProps: { min: 0 } }}
							/>
							{errors?.location && (
								<FormHelperText>{t(errors.location)}</FormHelperText>
							)}
						</FormControl>
					)}

					{values.mode === RobotOrderModeTypeEnum.SERVICE_POSITION && (
						<FormControl variant="outlined" fullWidth margin="normal">
							<InputLabel id="service-positions">
								{t(`${common}.FIELDS.SERVICE_POSITIONS.LABEL`)}
							</InputLabel>
							<Select
								required
								labelId="service-positions"
								id="service-positions"
								name="location"
								value={position}
								onChange={(e) => {
									setPosition(e.target.value);
									handleChangeSelect(e);
								}}
								label={t(`${common}.FIELDS.SERVICE_POSITIONS.LABEL`)}>
								{robot.servicePositions.content?.data.map((position) => (
									<MenuItem key={position.id} value={position.id}>
										{position.location}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					<FormControl variant="outlined" fullWidth margin="normal">
						<InputLabel id="order-mode">{t(`${common}.FIELDS.MODE.LABEL`)}</InputLabel>
						<Select
							required
							labelId="order-mode"
							id="mode"
							name="mode"
							value={values.mode}
							onChange={(e) => {
								setPosition('');
								handleChangeSelect(e);
							}}
							onBlur={handleBlur}
							label={t(`${common}.FIELDS.MODE.LABEL`)}>
							{orderModes().map(
								(mode) =>
									(mode !== RobotOrderModeTypeEnum.SERVICE_POSITION ||
										(mode === RobotOrderModeTypeEnum.SERVICE_POSITION &&
											robot.servicePositions.content?.data.length)) && (
										<MenuItem key={mode} value={mode}>
											{t(`ROBOTS:CONTENT.ORDERS.COMMON.MODE.${mode}`)}
										</MenuItem>
									)
							)}
						</Select>
					</FormControl>

					<FormControl margin="dense">
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									name="isDebug"
									disabled={!acceptOrders || undefined}
									checked={!acceptOrders || undefined}
									onChange={handleChangeCheckbox}
								/>
							}
							label={t(`${common}.FIELDS.DEBUG.LABEL`)}
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
						disabled={
							orders.updating ||
							!values.location ||
							(values.mode === RobotOrderModeTypeEnum.SERVICE_POSITION &&
								!position) ||
							(values.mode === RobotOrderModeTypeEnum.SERVICE_POSITION
								? regexOnlyNumbers.test(values.location)
								: !regexOnlyNumbers.test(values.location))
						}
						endIcon={orders.updating && <CircularProgress size={20} />}>
						{t('BUTTONS.CREATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateOrder;
