import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	RobotControlCommandSend,
	robotSelector
} from '../../../../../../slices/business/robots/Robot.slice';
import RobotDetailCommandActions from './RobotDetailCommandActions';
import RobotDetailCommandControl from './RobotDetailCommandControl';
import RobotDetailCommandMuteSensors from './RobotDetailCommandMuteSensors';
import { RobotDetailControlModeTypeEnum } from './RobotDetailCommands.enum';
import {
	RobotDetailCommandsInterface,
	RobotDetailCommandsPayloadInterface
} from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyle } from './RobotDetailCommands.style';

const RobotDetailCommands: FC<RobotDetailCommandsInterface> = (props) => {
	const { robotTwins } = props;
	const classes = RobotDetailCommandsStyle();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

	const [state, setState] = useState({
		ready: robotTwins.robotState.isReady.value,
		control: false,
		forward: false,
		backward: false,
		rotate: false,
		translate: false
	});

	const controlMode = robotTwins?.controlMode?.value;
	const muteSensorBack = robotTwins.safetySystems?.properties.backMutingActive;
	const muteSensorFront = robotTwins.safetySystems?.properties.frontMutingActive;

	useEffect(() => {
		if (controlMode === RobotDetailControlModeTypeEnum.ROC_CONTROL) {
			const data = {
				ready: state.ready,
				control: true,
				forward: false,
				backward: false,
				rotate: true,
				translate: false
			};
			if (muteSensorBack) {
				data.backward = true;
				data.rotate = false;
			} else if (muteSensorFront) {
				data.forward = true;
				data.rotate = false;
			}
			setState(data);
		} else {
			setState({
				ready: state.ready,
				control: false,
				rotate: false,
				translate: false,
				forward: false,
				backward: false
			});
		}
	}, [controlMode, muteSensorBack, muteSensorFront, state.ready]);

	/**
	 * send control command
	 * @param payload
	 * @returns
	 */
	const sendControlCommand = (payload: RobotDetailCommandsPayloadInterface) => () => {
		// dispatch: send robot control command
		dispatch(RobotControlCommandSend(robotTwins.robot.id, payload.command, payload.state));
	};

	return robotTwins ? (
		<Box className={classes.sCommandsContainer}>
			{/* Control */}
			<RobotDetailCommandControl
				robotTwins={robotTwins}
				robot={robot}
				state={state}
				sendControlCommand={sendControlCommand}
			/>

			{/* Mute Sensors */}
			<RobotDetailCommandMuteSensors
				robot={robot}
				state={state}
				sendControlCommand={sendControlCommand}
			/>

			{/* Actions */}
			<RobotDetailCommandActions
				robot={robot}
				state={state}
				sendControlCommand={sendControlCommand}
			/>
		</Box>
	) : null;
};
export default RobotDetailCommands;
