import { Box } from '@mui/material';
import { FC } from 'react';

import { RobotConfigurationRobotInterface } from './RobotConfigurationRobot.interface';
import { RobotConfigurationRobotStyle } from './RobotConfigurationRobot.style';
import RobotConfigurationRobotSection from './RobotConfigurationRobotSection';

const RobotConfigurationRobot: FC<RobotConfigurationRobotInterface> = (props) => {
	const { section } = props;
	const classes = RobotConfigurationRobotStyle();

	return (
		<Box className={classes.sBox}>
			<RobotConfigurationRobotSection section={section} />
		</Box>
	);
};
export default RobotConfigurationRobot;
