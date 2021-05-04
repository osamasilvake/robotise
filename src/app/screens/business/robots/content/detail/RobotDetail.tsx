import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import {
	RobotTwinsFetch,
	robotTwinsSelector
} from '../../../../../slices/robot-twins/RobotTwins.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotDetailAlerts from './alerts/RobotDetailAlerts';
import RobotDetailCameras from './cameras/RobotDetailCameras';
import RobotDetailCommands from './commands/RobotDetailCommands';
import RobotDetailGeneral from './general/RobotDetailGeneral';
import RobotDetailLocation from './location/RobotDetailLocation';
import RobotDetailStates from './states/RobotDetailStates';

const RobotDetail: FC = () => {
	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const params: RobotParamsInterface = useParams();
	const cRobotTwinsId = params.robot;
	const pRobotTwinsId = robotTwins.content?.data[0].id;

	useEffect(() => {
		const condition1 = sites.content !== null;
		const condition2 = robotTwins.content === null && cRobotTwinsId;
		const condition3 =
			robotTwins.content !== null && pRobotTwinsId && pRobotTwinsId !== cRobotTwinsId;

		if (condition1 && (condition2 || condition3)) {
			// dispatch: fetch robot twins of a robot
			dispatch(RobotTwinsFetch(cRobotTwinsId));
		}
	}, [dispatch, sites.content, robotTwins.content, pRobotTwinsId, cRobotTwinsId]);

	useEffect(() => {
		const executeServices = () => {
			if (sites.content && cRobotTwinsId) {
				// dispatch: fetch robot twins of a robot
				dispatch(RobotTwinsFetch(cRobotTwinsId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.robots.content.detail.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, cRobotTwinsId, sites.content]);

	useEffect(() => {
		if (sites.content && cRobotTwinsId) {
			// dispatch: fetch robot twins of a robot
			dispatch(RobotTwinsFetch(cRobotTwinsId, true));
		}
	}, [dispatch, sites.content, cRobotTwinsId]);

	// loader
	if (sites.loader || robotTwins.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors || robotTwins.errors) {
		return <PageError message={sites.errors?.text || robotTwins.errors?.text} />;
	}

	// empty
	// previous !== current
	if (!robotTwins.content || (pRobotTwinsId && pRobotTwinsId !== cRobotTwinsId)) {
		return null;
	}

	return (
		<Box>
			<RobotDetailGeneral robotTwin={robotTwins.content.data[0]} />
			<RobotDetailAlerts robotTwin={robotTwins.content.data[0]} />
			<RobotDetailLocation robotTwin={robotTwins.content.data[0]} />
			<RobotDetailCommands robotTwin={robotTwins.content.data[0]} />
			<RobotDetailCameras robotTwin={robotTwins.content.data[0]} />
			<RobotDetailStates robotTwin={robotTwins.content.data[0]} />
		</Box>
	);
};
export default RobotDetail;
