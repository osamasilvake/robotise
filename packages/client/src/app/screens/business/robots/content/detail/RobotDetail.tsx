import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../../components/common/loader/Loader';
import PageError from '../../../../../components/content/page-error/PageError';
import {
	robotTwinsSelector,
	RobotTwinsSingleRobotFetchList
} from '../../../../../slices/robot-twins/RobotTwins.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { removeSpecialCharacters } from '../../../../../utilities/methods/StringUtilities';
import RobotDetailGeneral from './RobotDetailGeneral';

const RobotDetail: FC = () => {
	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotTwins = useSelector(robotTwinsSelector);

	useEffect(() => {
		if (robotTwinsSummary.content !== null && robotTwins.content === null) {
			// fetch robot name from url
			const getRobotName = 'uniform';

			// fetch robot name in robot twins summary
			const robotName = removeSpecialCharacters(getRobotName);
			const findRobot = robotTwinsSummary.content.data.find(
				(r) => removeSpecialCharacters(r.name) === robotName
			);
			const robotId = findRobot ? findRobot.id : 'unknown';

			// dispatch: fetch robot twins of single robot
			dispatch(RobotTwinsSingleRobotFetchList(robotId));
		}
	}, [dispatch, robotTwinsSummary.content, robotTwins.content]);

	// loading
	if (robotTwinsSummary.loading || robotTwins.loading) {
		return <Loader spinner spinnerSmall spinnerText="LOADING" />;
	}

	// error
	if (robotTwins.errors && robotTwins.errors.text) {
		return <PageError message={robotTwins.errors.text} />;
	}

	return <RobotDetailGeneral content={robotTwins.content} />;
};
export default RobotDetail;
