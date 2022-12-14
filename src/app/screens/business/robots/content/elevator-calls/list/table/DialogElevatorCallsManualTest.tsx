import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	Icon,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../../slices';
import {
	ElevatorCallsManualTest,
	elevatorCallsSelector
} from '../../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { dateFormat3 } from '../../../../../../../utilities/methods/Date';
import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../../utilities/methods/String';
import {
	RobotElevatorCallsManualTestTypeEnum,
	RobotElevatorCallsTableColumnHistoryDetailsTypeEnum,
	RobotElevatorCallsTableColumnHistoryEventTypeEnum
} from './RobotElevatorCallsTable.enum';
import {
	DialogElevatorCallsManualTestFormInterface,
	DialogElevatorCallsManualTestInterface
} from './RobotElevatorCallsTable.interface';
import { mapElevatorCall, mapHistoryEventType } from './RobotElevatorCallsTable.map';
import { RobotElevatorCallsTableStyle } from './RobotElevatorCallsTable.style';

const DialogElevatorCallsManualTest: FC<DialogElevatorCallsManualTestInterface> = (props) => {
	const { open, setOpen, elevatorCall } = props;
	const { t } = useTranslation(['GENERAL', 'DIALOG']);
	const classes = RobotElevatorCallsTableStyle();

	const dispatch = useDispatch<AppDispatch>();
	const elevatorCalls = useSelector(elevatorCallsSelector);

	const mappedElevatorCall = mapElevatorCall(elevatorCall);
	const historyMapped = mappedElevatorCall.history;
	const typeSendLift = RobotElevatorCallsTableColumnHistoryEventTypeEnum.SEND_LIFT;
	const typeEnterCar = RobotElevatorCallsTableColumnHistoryDetailsTypeEnum.ENTER_CAR;
	const typeExitCar = RobotElevatorCallsTableColumnHistoryDetailsTypeEnum.EXIT_CAR;
	const isSendLeft = elevatorCall.history.some((f) => f.event === typeSendLift);
	const isEnterCar = elevatorCall.history.some((f) => f.details === typeEnterCar);
	const isExitCar = elevatorCall.history.some((f) => f.details === typeExitCar);
	const translation = 'COMMON.ELEVATOR_CALLS.LIST.TABLE.VALUES.MANUAL_EVENTS';

	const { handleChangeInput, handleBlur, handleSubmit, values } =
		useForm<DialogElevatorCallsManualTestFormInterface>(
			{ liftId: '' },
			() => ({ liftId: '' }),
			async () => {
				// dispatch: test manual elevator calls
				dispatch(
					ElevatorCallsManualTest(
						RobotElevatorCallsManualTestTypeEnum.SEND_LIFT,
						elevatorCall.id,
						values.liftId
					)
				);
			}
		);

	/**
	 * handle enter/exit car
	 * @param type
	 */
	const onHandleCarAction = (type: RobotElevatorCallsManualTestTypeEnum) => {
		// dispatch: test manual elevator calls
		dispatch(ElevatorCallsManualTest(type, elevatorCall.id));
	};

	return (
		<Dialog fullWidth open={open > -1} onClose={() => setOpen(-1)} maxWidth="lg">
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				{/* Block 1 */}
				<Grid container spacing={1} className={classes.sDialogBlock}>
					<Grid item xs={12} sm={3}>
						<Stack spacing={0.5} direction="row" alignItems="center">
							<Typography>{t(`${translation}.SOURCE`)}</Typography>:
							<Typography className={classes.sDialogBoldText}>
								{elevatorCall.srcAreaId}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Stack spacing={0.5} direction="row" alignItems="center">
							<Typography>{t(`${translation}.DESTINATION`)}</Typography>:
							<Typography className={classes.sDialogBoldText}>
								{elevatorCall.dstAreaId}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={5}>
						<Stack spacing={0.5} direction="row" alignItems="center">
							<Typography>{t(`${translation}.CALL_TYPE`)}</Typography>:
							<Typography className={classes.sDialogBoldText}>
								{strCapitalLetterAndCamelCaseToDash(elevatorCall.callType)}
							</Typography>
						</Stack>
					</Grid>
				</Grid>

				{/* Block 2 */}
				<Grid container spacing={1} className={classes.sDialogBlock}>
					<Grid item xs={12} md={8}>
						{/* Test Actions */}
						<form onSubmit={handleSubmit} className={classes.sDialogBlock}>
							<Stack spacing={0.5} direction="row" alignItems="center">
								<FormControl>
									<TextField
										required
										size="small"
										type="text"
										id="liftId"
										name="liftId"
										label={t(`${translation}.FORM.FIELDS.LIFT_ID.LABEL`)}
										placeholder={t(
											`${translation}.FORM.FIELDS.LIFT_ID.PLACEHOLDER`
										)}
										onChange={handleChangeInput}
										onBlur={handleBlur}
										disabled={isSendLeft}
									/>
								</FormControl>
								<Button
									variant="outlined"
									type="submit"
									disabled={
										!values.liftId || isSendLeft || elevatorCalls.updating
									}
									endIcon={
										elevatorCalls.updating &&
										!isSendLeft && <CircularProgress size={20} />
									}>
									{t(`${translation}.FORM.BUTTONS.SEND_LIFT`)}
								</Button>
							</Stack>
						</form>

						{/* Block 3 */}
						<Grid container spacing={1}>
							<Grid item>
								<Button
									variant="outlined"
									disabled={isEnterCar || elevatorCalls.updating}
									endIcon={
										elevatorCalls.updating &&
										!isEnterCar && <CircularProgress size={20} />
									}
									onClick={() =>
										onHandleCarAction(
											RobotElevatorCallsManualTestTypeEnum.ENTER_CAR
										)
									}>
									{t(`${translation}.FORM.BUTTONS.ENTER_CAR`)}
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									disabled={isExitCar || elevatorCalls.updating}
									endIcon={
										elevatorCalls.updating &&
										!isExitCar && <CircularProgress size={20} />
									}
									onClick={() =>
										onHandleCarAction(
											RobotElevatorCallsManualTestTypeEnum.EXIT_CAR
										)
									}>
									{t(`${translation}.FORM.BUTTONS.EXIT_CAR`)}
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={4}>
						{/* History */}
						{elevatorCall?.history.map((item, index) => (
							<Stack
								key={index}
								spacing={0.5}
								direction="row"
								className={classes.sTableHistory}>
								<Icon
									color={mapHistoryEventType(t(item.event)).color}
									className={classes.sTableHistoryIcon}>
									{mapHistoryEventType(t(item.event)).icon}
								</Icon>
								<Typography variant="body2" className={classes.sHistoryEvent}>
									{t(historyMapped[index].event)}
									{!!item.details && `: ${item.details}`}
								</Typography>
								<Typography variant="caption" color="textSecondary">
									({dateFormat3(item.createdAt)})
								</Typography>
							</Stack>
						))}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(-1)}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogElevatorCallsManualTest;
