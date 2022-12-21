import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../../slices';
import {
	RobotConfigurationFetch,
	robotConfigurationSelector
} from '../../../../../slices/business/robots/configuration/robot/RobotConfiguration.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import { RobotConfigurationStyle } from './RobotConfiguration.style';
import RobotConfigurationTabs from './RobotConfiguration.tabs';

const RobotConfiguration: FC = () => {
	const classes = RobotConfigurationStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotConfiguration = useSelector(robotConfigurationSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const section = robotConfiguration.content;
	const pRobotId = robotConfiguration.content?.pRobotId;
	const cRobotId = params.robotId;

	useEffect(() => {
		const condition1 = robotConfiguration.content === null && cRobotId;
		const condition2 = robotConfiguration.content !== null && pRobotId && pRobotId !== cRobotId;

		if (condition1 || condition2) {
			// dispatch: fetch robot configuration
			dispatch(RobotConfigurationFetch(cRobotId));
		}
	}, [dispatch, pRobotId, cRobotId, robotConfiguration.content]);

	// loader
	if (robotConfiguration.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotConfiguration.errors) {
		return <PageError message={robotConfiguration.errors?.text} />;
	}

	// init
	if (!robotConfiguration.init) return null;

	// empty
	if (!robotConfiguration.content) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			{/* Content */}
			{section?.data && <RobotConfigurationTabs sections={section.data} />}
		</Box>
	);
};
export default RobotConfiguration;
