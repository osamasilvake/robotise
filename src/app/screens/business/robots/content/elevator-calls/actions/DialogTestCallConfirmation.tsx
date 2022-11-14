import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	ElevatorCallsFetchList,
	elevatorCallsSelector,
	ElevatorCallsTest
} from '../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { DialogTestCallConfirmationInterface } from './RobotElevatorCallsActions.interface';

const DialogTestCallConfirmation: FC<DialogTestCallConfirmationInterface> = (props) => {
	const { open, setOpen, halt, setHalt } = props;
	const { t } = useTranslation(['GENERAL', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const elevatorCalls = useSelector(elevatorCallsSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;

	const page = elevatorCalls.content?.state?.page || 0;
	const rowsPerPage =
		elevatorCalls.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.robots.content.elevatorCalls.list
			.defaultPageSize;

	const translation = 'COMMON.ELEVATOR_CALLS.LIST.ACTIONS.TEST_CALL';

	/**
	 * text call confirmation product
	 * @param status
	 * @returns
	 */
	const executeTestCall = (status: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		!status && setOpen(false);

		// dispatch: delete product
		status &&
			cSiteId &&
			dispatch(
				ElevatorCallsTest(cSiteId, async () => {
					// callback
					ElevatorCallsFetchList(cRobotId, { page, rowsPerPage }, true);

					// set halt for the test call button
					setHalt(true);

					// close dialog
					setOpen(false);
				})
			);
	};

	return (
		<Dialog open={open} onClose={executeTestCall(false)}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				<DialogContentText>{t(`${translation}.TEXT`)}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={executeTestCall(false)}
					disabled={elevatorCalls.updating}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					variant="outlined"
					onClick={executeTestCall(true)}
					disabled={halt || elevatorCalls.updating}
					endIcon={elevatorCalls.updating && <CircularProgress size={20} />}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogTestCallConfirmation;
