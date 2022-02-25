import { Elevator } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import {
	ElevatorCallsFetchList,
	elevatorCallsSelector,
	ElevatorCallsTest
} from '../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { timeout } from '../../../../../../utilities/methods/Timeout';
import { RobotParamsInterface } from '../../../Robot.interface';

const RobotElevatorCallsTest: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const elevatorCalls = useSelector(elevatorCallsSelector);

	const [halt, setHalt] = useState(false);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const translation = 'CONTENT.ELEVATOR_CALLS.LIST.ACTIONS';

	const page = elevatorCalls.content?.state?.page || 0;
	const rowsPerPage =
		elevatorCalls.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.robots.content.elevatorCalls.list
			.defaultPageSize;

	/**
	 * test elevator calls
	 */
	const testElevatorCalls = async () => {
		// halt
		setHalt(true);

		// dispatch: test elevator call
		cSiteId &&
			dispatch(
				ElevatorCallsTest(cSiteId, async () => {
					// callback
					ElevatorCallsFetchList(cRobotId, { page, rowsPerPage }, true);
				})
			);

		// wait
		await timeout(5000).then(() => setHalt(false));
	};

	return (
		<Chip
			size="small"
			icon={<Elevator />}
			label={t(`${translation}.TEST_CALLS`)}
			color="primary"
			variant="outlined"
			clickable
			disabled={halt || elevatorCalls.updating}
			onClick={testElevatorCalls}
		/>
	);
};
export default RobotElevatorCallsTest;
