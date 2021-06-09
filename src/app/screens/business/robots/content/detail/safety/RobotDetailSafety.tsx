import { Box } from '@material-ui/core';
import { FC } from 'react';

import { RobotDetailSafetyInterface } from './RobotDetailSafety.interface';
import RobotDetailSafetySensors from './RobotDetailSensors';
import RobotDetailSafetySystems from './RobotDetailSystems';

const RobotDetailSafety: FC<RobotDetailSafetyInterface> = (props) => {
	const { robotTwins } = props;

	return (
		<Box>
			<RobotDetailSafetySensors sensors={robotTwins.safetySensorsState} />
			<RobotDetailSafetySystems systems={robotTwins.safetySystemsState} />
		</Box>
	);
};
export default RobotDetailSafety;
