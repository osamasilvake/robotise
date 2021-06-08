import { Box } from '@material-ui/core';
import { FC } from 'react';

import { RobotDetailSafetyInterface } from './RobotDetailSafety.interface';
import RobotDetailSensors from './RobotDetailSensors';
import RobotDetailSystems from './RobotDetailSystems';

const RobotDetailSafety: FC<RobotDetailSafetyInterface> = (props) => {
	const { robotTwins } = props;

	return (
		<Box>
			<RobotDetailSensors sensors={robotTwins.safetySensorsState} />
			<RobotDetailSystems systems={robotTwins.safetySystemsState} />
		</Box>
	);
};
export default RobotDetailSafety;
