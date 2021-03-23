import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import PageError from '../../../../../components/content/page-error/PageError';
import {
	robotTwinsSelector,
	RobotTwinsSingleRobotFetchList
} from '../../../../../slices/robot-twins/RobotTwins.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { removeSpecialCharacters } from '../../../../../utilities/methods/StringUtilities';
import RobotDetailAlerts from './alerts/RobotContentDetailAlerts';
import RobotDetailGeneral from './general/RobotContentDetailGeneral';
import { RobotContentDetailGeneralParamsInterface } from './RobotContentDetail.interface';
import RobotContentDetailStates from './states/RobotContentDetailStates';

const RobotContentDetail: FC = () => {
	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const params: RobotContentDetailGeneralParamsInterface = useParams();

	useEffect(() => {
		const cRobotName = removeSpecialCharacters(params.id);
		const pRobotName = removeSpecialCharacters(robotTwins.content?.data[0].robot.name || '');

		const condition1 = cRobotName;
		const condition2 = robotTwinsSummary.content !== null && robotTwins.content === null;
		const condition3 = robotTwins.content !== null && pRobotName !== condition1;

		if ((condition1 && condition2) || condition3) {
			// fetch robot name from robot twins summary
			const findRobot = robotTwinsSummary.content?.data.find(
				(r) => removeSpecialCharacters(r.robotTitle) === cRobotName
			);
			const robotId = findRobot ? findRobot.id : 'unknown';

			// dispatch: fetch robot twins of single robot
			dispatch(RobotTwinsSingleRobotFetchList(robotId));
		}
	}, [dispatch, params.id, robotTwinsSummary.content, robotTwins.content]);

	// loading
	if (!robotTwinsSummary.content || robotTwins.loading) {
		return <Loader spinner spinnerSmall spinnerText="LOADING" />;
	}

	// error
	if (robotTwins.errors && robotTwins.errors.text) {
		return <PageError message={robotTwins.errors.text} />;
	}

	// empty
	if (!(robotTwins.content && robotTwins.content.data)) {
		return null;
	}

	return (
		<>
			<RobotDetailGeneral robot={robotTwins.content.data[0]} />
			<RobotDetailAlerts robot={robotTwins.content.data[0]} />
			<RobotContentDetailStates robot={robotTwins.content.data[0]} />
		</>
	);
};
export default RobotContentDetail;
