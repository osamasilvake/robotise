import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import PageError from '../../../../../components/content/page-error/PageError';
import {
	robotTwinsSelector,
	RobotTwinsSingleRobotFetchList
} from '../../../../../slices/robot-twins/RobotTwins.slice';
import RobotDetailAlerts from './alerts/RobotContentDetailAlerts';
import RobotContentDetailCameras from './cameras/RobotContentDetailCameras';
import RobotDetailGeneral from './general/RobotContentDetailGeneral';
import RobotContentDetailLocation from './location/RobotContentDetailLocation';
import { RobotContentDetailParamsInterface } from './RobotContentDetail.interface';
import RobotContentDetailStates from './states/RobotContentDetailStates';

const RobotContentDetail: FC = () => {
	const dispatch = useDispatch();
	const robotTwins = useSelector(robotTwinsSelector);

	const params: RobotContentDetailParamsInterface = useParams();

	useEffect(() => {
		const cRobotId = params.id;
		const pRobotId = robotTwins.content?.data[0].id;

		const condition1 = robotTwins.content === null && cRobotId;
		const condition2 = robotTwins.content !== null && pRobotId !== cRobotId;

		if (condition1 || condition2) {
			// dispatch: fetch robot twins of single robot
			dispatch(RobotTwinsSingleRobotFetchList(cRobotId));
		}
	}, [dispatch, params.id, robotTwins.content]);

	// loader
	if (robotTwins.loader) {
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
		<Box>
			<RobotDetailGeneral robot={robotTwins.content.data[0]} />
			<RobotDetailAlerts robot={robotTwins.content.data[0]} />
			<RobotContentDetailLocation robot={robotTwins.content.data[0]} />
			<RobotContentDetailCameras
				robot={robotTwins.content.data[0]}
				loading={robotTwins.loading}
			/>
			<RobotContentDetailStates robot={robotTwins.content.data[0]} />
		</Box>
	);
};
export default RobotContentDetail;
