import { Box } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { robotSelector } from '../../../../../../slices/robot/Robot.slice';
import RobotDetailCommandActions from './RobotDetailCommandActions';
import RobotDetailCommandControl from './RobotDetailCommandControl';
import RobotDetailCommandMuteSensors from './RobotDetailCommandMuteSensors';
import {
	RobotDetailCommandsControlTypeEnum,
	RobotDetailCommandsMuteSensorsTypeEnum
} from './RobotDetailCommands.enum';
import { RobotDetailCommandsInterface } from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommands: FC<RobotDetailCommandsInterface> = (props) => {
	const { robotTwin } = props;
	const classes = RobotDetailCommandsStyles();

	const robot = useSelector(robotSelector);

	const [state, setState] = useState({
		control: false,
		forward: false,
		backward: false,
		rotate: false,
		translate: false
	});

	const controlMode = robotTwin.joystickState?.controlMode.value;
	const muteSensorState = robotTwin.muteSensorState?.value;

	useEffect(() => {
		if (controlMode === RobotDetailCommandsControlTypeEnum.ROC_CONTROL) {
			const state = {
				control: true,
				forward: true,
				backward: true,
				rotate: true,
				translate: true
			};
			if (muteSensorState === RobotDetailCommandsMuteSensorsTypeEnum.FRONT_MUTED) {
				state.forward = false;
				state.backward = true;
				state.rotate = false;
			} else if (muteSensorState === RobotDetailCommandsMuteSensorsTypeEnum.BACK_MUTED) {
				state.forward = true;
				state.backward = false;
				state.rotate = false;
			}
			setState(state);
		} else {
			setState({
				control: false,
				rotate: false,
				translate: false,
				forward: true,
				backward: true
			});
		}
	}, [controlMode, muteSensorState]);

	return robotTwin ? (
		<Box className={classes.sCommandsContainer}>
			{/* Control */}
			<RobotDetailCommandControl robotTwin={robotTwin} robot={robot} state={state} />

			{/* Mute Sensors */}
			<RobotDetailCommandMuteSensors state={state} />

			{/* Actions */}
			<RobotDetailCommandActions state={state} />
		</Box>
	) : null;
};
export default RobotDetailCommands;
