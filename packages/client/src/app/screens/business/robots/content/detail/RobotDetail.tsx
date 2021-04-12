import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageError from '../../../../../components/content/page-error/PageError';
import {
	RobotTwinsFetchList,
	robotTwinsSelector
} from '../../../../../slices/robot-twins/RobotTwins.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import RobotDetailAlerts from './alerts/RobotDetailAlerts';
import RobotDetailCameras from './cameras/RobotDetailCameras';
import RobotDetailGeneral from './general/RobotDetailGeneral';
import RobotDetailLocation from './location/RobotDetailLocation';
import { RobotDetailParamsInterface } from './RobotDetail.interface';
import RobotDetailStates from './states/RobotDetailStates';

const RobotDetail: FC = () => {
	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const params: RobotDetailParamsInterface = useParams();
	const cRobotTwinsId = params.id;
	const pRobotTwinsId = robotTwins.content?.data[0].id;

	useEffect(() => {
		const condition1 = robotTwins.content === null && cRobotTwinsId;
		const condition2 = robotTwins.content !== null && pRobotTwinsId !== cRobotTwinsId;
		const condition3 = !sites.loader;

		if ((condition1 || condition2) && condition3) {
			// dispatch: fetch robot twins of a robot
			// loading: previous robotTwinsId !== current robotTwinsId
			dispatch(RobotTwinsFetchList(cRobotTwinsId, pRobotTwinsId === cRobotTwinsId));
		}
	}, [dispatch, sites.loader, robotTwins.content, pRobotTwinsId, cRobotTwinsId]);

	// loader
	if (sites.loader || robotTwins.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotTwins.errors) {
		return <PageError message={robotTwins.errors.text} />;
	}

	// empty
	if (!robotTwins.content) {
		return null;
	}

	/**
	 * additional
	 * previous robotTwinsId !== current robotTwinsId
	 */
	if (pRobotTwinsId !== cRobotTwinsId) {
		return null;
	}

	return (
		<Box>
			<RobotDetailGeneral robot={robotTwins.content.data[0]} />
			<RobotDetailAlerts robot={robotTwins.content.data[0]} />
			<RobotDetailLocation robot={robotTwins.content.data[0]} />
			<RobotDetailCameras robot={robotTwins.content.data[0]} loading={robotTwins.loading} />
			<RobotDetailStates robot={robotTwins.content.data[0]} />
		</Box>
	);
};
export default RobotDetail;
