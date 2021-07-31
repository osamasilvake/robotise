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
} from '../../../../../slices/business/robots/RobotTwins.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
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
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const params: RobotParamsInterface = useParams();
	const cRobotId = params.robotId;
	const pRobotId = robotTwins.content?.robot.id;
	const robotTwinId = robotTwinsSummary.content?.dataById[params.robotId]?.id;

	useEffect(() => {
		const condition1 = robotTwins.content === null && cRobotId;
		const condition2 = robotTwins.content !== null && pRobotId && pRobotId !== cRobotId;

		if (condition1 || condition2) {
			// dispatch: fetch robot twins of a robot
			robotTwinId && dispatch(RobotTwinsFetch(robotTwinId));
		}
	}, [dispatch, robotTwins.content, pRobotId, cRobotId, robotTwinId]);

	useEffect(() => {
		const executeServices = () => {
			if (robotTwinId) {
				// dispatch: fetch robot twins of a robot
				dispatch(RobotTwinsFetch(robotTwinId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.robots.content.detail.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, robotTwinId]);

	// loader
	if (robotTwins.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotTwins.errors) {
		return <PageError message={robotTwins.errors?.text} />;
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
