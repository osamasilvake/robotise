import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { RobotTwinsFetch, robotTwinsSelector } from '../../../../../slices/robots/RobotTwins.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotDetailAlerts from './alerts/RobotDetailAlerts';
import RobotDetailCameras from './cameras/RobotDetailCameras';
import RobotDetailCommands from './commands/RobotDetailCommands';
import RobotDetailGeneral from './general/RobotDetailGeneral';
import RobotDetailLocation from './location/RobotDetailLocation';
import { RobotDetailStyle } from './RobotDetail.style';
import RobotDetailSafety from './safety/RobotDetailSafety';
import RobotDetailStates from './states/RobotDetailStates';

const RobotDetail: FC = () => {
	const classes = RobotDetailStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const params: RobotParamsInterface = useParams();
	const cRobotId = params.robot;
	const pRobotId = robotTwins.content?.robot.id;
	const robotTwinId = robotTwinsSummary.content?.dataById[params.robot].id;

	useEffect(() => {
		const condition1 = sites.content !== null;
		const condition2 = robotTwins.content === null && cRobotId;
		const condition3 = robotTwins.content !== null && pRobotId && pRobotId !== cRobotId;

		if (condition1 && (condition2 || condition3)) {
			// dispatch: fetch robot twins of a robot
			robotTwinId && dispatch(RobotTwinsFetch(robotTwinId));
		}
	}, [dispatch, sites.content, robotTwins.content, pRobotId, cRobotId, robotTwinId]);

	useEffect(() => {
		const executeServices = () => {
			if (sites.content && robotTwinId) {
				// dispatch: fetch robot twins of a robot
				dispatch(RobotTwinsFetch(robotTwinId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.robots.content.detail.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, robotTwinId, sites.content]);

	// loader
	if (sites.loader || robotTwins.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors || robotTwins.errors) {
		return <PageError message={sites.errors?.text || robotTwins.errors?.text} />;
	}

	// null
	if (!robotTwins.content || (pRobotId && pRobotId !== cRobotId)) {
		return null;
	}

	// empty
	if (!robotTwins.content.updatedAt) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<RobotDetailGeneral robotTwins={robotTwins.content} />
			<RobotDetailAlerts robotTwins={robotTwins.content} />
			<RobotDetailLocation robotTwins={robotTwins.content} />
			<RobotDetailCommands robotTwins={robotTwins.content} />
			<RobotDetailCameras robotTwins={robotTwins.content} />
			<RobotDetailStates robotTwins={robotTwins.content} />
			<RobotDetailSafety robotTwins={robotTwins.content} />
		</Box>
	);
};
export default RobotDetail;
