import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
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
import { RobotDetailStyles } from './RobotDetail.style';
import RobotDetailStates from './states/RobotDetailStates';

const RobotDetail: FC = () => {
	const classes = RobotDetailStyles();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const params: RobotParamsInterface = useParams();
	const cRobotTwinsId = params.robot;
	const pRobotTwinsId = robotTwins.content?.id;

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

	// loader
	if (sites.loader || robotTwins.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors || robotTwins.errors) {
		return <PageError message={sites.errors?.text || robotTwins.errors?.text} />;
	}

	// null
	if (!robotTwins.content || (pRobotTwinsId && pRobotTwinsId !== cRobotTwinsId)) {
		return null;
	}

	// empty
	if (!robotTwins.content) {
		return <PageEmpty message="EMPTY.MESSAGE"></PageEmpty>;
	}

	return (
		<Box className={classes.sBox}>
			<RobotDetailGeneral robotTwins={robotTwins.content} />
			<RobotDetailAlerts robotTwins={robotTwins.content} />
			<RobotDetailLocation robotTwins={robotTwins.content} />
			<RobotDetailCommands robotTwins={robotTwins.content} />
			<RobotDetailCameras robotTwins={robotTwins.content} />
			<RobotDetailStates robotTwins={robotTwins.content} />
		</Box>
	);
};
export default RobotDetail;
