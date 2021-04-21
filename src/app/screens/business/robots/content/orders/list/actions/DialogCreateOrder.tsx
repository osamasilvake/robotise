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

import { OrderCreate, ordersSelector } from '../../../../../../../slices/orders/Orders.slice';
import { robotTwinsSummarySelector } from '../../../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObjProperty } from '../../../../../../../utilities/methods/ObjectUtilities';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { CreateOrderValidation } from './DialogCreateOrder.validation';
import { RobotOrderModeTypeEnum } from './RobotOrdersActions.enum';
import {
	DialogCreateOrderPayloadInterface,
	DialogNewOrderInterface
} from './RobotOrdersActions.interface';
import { orderModes } from './RobotOrdersActions.map';

const DialogCreateOrder: FC<DialogNewOrderInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'ROBOTS']);

	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const orders = useSelector(ordersSelector);

	const params: RobotParamsInterface = useParams();
	const siteId = robotTwinsSummary.content?.dataById[params.robot]?.site.id;

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
			isDebug: true,
			location: '',
			mode: RobotOrderModeTypeEnum.MINI_BAR
		},
		CreateOrderValidation,
		async () => {
			// dispatch: create an order
			siteId && dispatch(OrderCreate(values, siteId));
		}
	);

	/**
	 * on close action
	 * @param status
	 * @returns
	 */
	const onActionClose = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={onActionClose}>
			<Box onClick={(e) => e.stopPropagation()}>
				<form onSubmit={handleSubmit}>
					<DialogTitle>
						{t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_NEW.TITLE')}
					</DialogTitle>
					<DialogContent>
						<Typography variant="body1" color="textSecondary">
							{t('ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_NEW.TEXT')}
						</Typography>

						<FormControl error fullWidth margin="normal">
							<TextField
								required
								variant="outlined"
								type="number"
								id="location"
								name="location"
								error={!!errors.location}
								onChange={handleChangeInput}
								onBlur={handleBlur}
								label={t(
									'ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_NEW.FIELDS.LOCATION.LABEL'
								)}
								placeholder={t(
									'ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_NEW.FIELDS.LOCATION.PLACEHOLDER'
								)}
							/>
							<FormHelperText>{t(errors.location)}</FormHelperText>
						</FormControl>

						<FormControl variant="outlined" fullWidth margin="normal">
							<InputLabel id="order-mode">Mode</InputLabel>
							<Select
								required
								labelId="order-mode"
								id="mode"
								name="mode"
								value={values.mode}
								onChange={handleChangeSelect}
								onBlur={handleBlur}
								label="Mode">
								{orderModes().map((mode) => (
									<MenuItem key={mode} value={RobotOrderModeTypeEnum.MINI_BAR}>
										{t(`ROBOTS:CONTENT.ORDERS.COMMON.MODE.${mode}`)}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									name="isDebug"
									onChange={handleChangeCheckbox}
								/>
							}
							label={t(
								'ROBOTS:CONTENT.ORDERS.LIST.OPTIONS.ORDER_NEW.FIELDS.DEBUG.LABEL'
							)}
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="outlined" onClick={onActionClose}>
							{t('BUTTONS.CANCEL')}
						</Button>
						<Button
							variant="outlined"
							type="submit"
							disabled={validateEmptyObjProperty(values) || orders.creating}
							endIcon={orders.creating && <CircularProgress size={20} />}>
							{t('BUTTONS.CREATE')}
						</Button>
					</DialogActions>
				</form>
			</Box>
		</Dialog>
	);
};
export default DialogCreateOrder;
