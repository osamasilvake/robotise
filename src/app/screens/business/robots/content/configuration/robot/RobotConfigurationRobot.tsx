import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../../../slices';
import {
	RobotConfigurationFetch,
	robotConfigurationSelector
} from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotConfigurationRobotStyle } from './RobotConfigurationRobot.style';
import RobotConfigurationRobotSection from './RobotConfigurationRobotSection';

const RobotConfigurationRobot: FC = () => {
	const classes = RobotConfigurationRobotStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotConfiguration = useSelector(robotConfigurationSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const section = robotConfiguration.content && robotConfiguration.content[0];

	useEffect(() => {
		// return
		if (robotConfiguration.content) return;

		// dispatch: fetch robot configuration
		dispatch(RobotConfigurationFetch(cRobotId));
	}, [dispatch, cRobotId, robotConfiguration.content]);

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
			{/* Section */}
			<RobotConfigurationRobotSection section={section} />
		</Box>
	);
};
export default RobotConfigurationRobot;
