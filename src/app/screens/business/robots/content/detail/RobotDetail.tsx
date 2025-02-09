import { Box, Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import { AppDispatch } from '../../../../../slices';
import {
	RobotTwinsFetch,
	robotTwinsSelector
} from '../../../../../slices/business/robots/RobotTwins.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import RobotDetailAlerts from './alerts/RobotDetailAlerts';
import RobotDetailCameras from './cameras/RobotDetailCameras';
import RobotDetailCommands from './commands/RobotDetailCommands';
import RobotDetailDataLogs from './data-logs/RobotDetailDataLogs';
import RobotDetailGeneral from './general/RobotDetailGeneral';
import RobotDetailInformation from './information/RobotDetailInformation';
import RobotDetailLocation from './location/RobotDetailLocation';
import RemoteSafetyReset from './remote-safety-reset/RobotDetailRemoteSafetyReset';
import { RobotDetailStyle } from './RobotDetail.style';
import RobotDetailStates from './states/RobotDetailStates';

const RobotDetail: FC = () => {
	const classes = RobotDetailStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const pRobotId = robotTwins.content?.robot.id;
	const robotTwinId = robotTwinsSummary.content?.dataById[cRobotId]?.id;

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
			// dispatch: fetch robot twins of a robot
			robotTwinId && dispatch(RobotTwinsFetch(robotTwinId, true));
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

	// init
	if (!robotTwins.init) return null;

	// empty
	if (!robotTwins.content?.updatedAt) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			{/* General */}
			<RobotDetailGeneral robotTwins={robotTwins.content} />

			{/* Alerts */}
			<RobotDetailAlerts robotTwins={robotTwins.content} />

			{/* Locations */}
			<RobotDetailLocation robotTwins={robotTwins.content} />

			{/* Commands */}
			{/* Remote Safety Reset */}
			<Grid container spacing={0}>
				<Grid item xs={12} md={8} lg={6}>
					<RobotDetailCommands robotTwins={robotTwins.content} />
				</Grid>
				<Grid item xs={12} md={4} lg={6}>
					<RemoteSafetyReset robotTwins={robotTwins.content} />
				</Grid>
			</Grid>

			{/* Cameras */}
			<RobotDetailCameras robotTwins={robotTwins.content} />

			{/* States */}
			<RobotDetailStates robotTwins={robotTwins.content} />

			{/* Information */}
			<RobotDetailInformation robotTwins={robotTwins.content} />

			{/* Data Logs */}
			<RobotDetailDataLogs />
		</Box>
	);
};
export default RobotDetail;
