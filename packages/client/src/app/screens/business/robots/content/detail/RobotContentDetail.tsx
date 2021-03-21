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

const RobotContentDetail: FC = () => {
	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const params: RobotContentDetailGeneralParamsInterface = useParams();

	useEffect(() => {
		if (params.id && robotTwinsSummary.content !== null && robotTwins.content === null) {
			// fetch robot name from url
			const getRobotName = params.id;

			// fetch robot name in robot twins summary
			const robotName = removeSpecialCharacters(getRobotName);
			const findRobot = robotTwinsSummary.content.data.find(
				(r) => removeSpecialCharacters(r.name) === robotName
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

	// init
	if (!robotTwins.content) {
		return null;
	}

	return (
		<>
			<RobotDetailGeneral content={robotTwins.content} />
			<RobotDetailAlerts content={robotTwins.content} />
		</>
	);
};
export default RobotContentDetail;
