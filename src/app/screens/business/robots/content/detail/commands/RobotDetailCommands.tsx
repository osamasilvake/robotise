import { Box } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TriggerMessageTypeEnum } from '../../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../../components/frame/message/Message.interface';
import { AppConfigService } from '../../../../../../services';
import { GeneralTriggerMessage } from '../../../../../../slices/general/General.slice';
import { RobotControlCommandSend, robotSelector } from '../../../../../../slices/robot/Robot.slice';
import { RobotTwinsFetch } from '../../../../../../slices/robot-twins/RobotTwins.slice';
import RobotDetailCommandActions from './RobotDetailCommandActions';
import RobotDetailCommandControl from './RobotDetailCommandControl';
import RobotDetailCommandMuteSensors from './RobotDetailCommandMuteSensors';
import {
	RobotDetailCommandsControlTypeEnum,
	RobotDetailCommandsMuteSensorsTypeEnum
} from './RobotDetailCommands.enum';
import {
	RobotDetailCommandsInterface,
	RobotDetailCommandsPayloadInterface
} from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommands: FC<RobotDetailCommandsInterface> = (props) => {
	const { robotTwin } = props;
	const classes = RobotDetailCommandsStyles();

	const dispatch = useDispatch();
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
				forward: false,
				backward: false,
				rotate: true,
				translate: false
			};
			if (muteSensorState === RobotDetailCommandsMuteSensorsTypeEnum.FRONT_MUTED) {
				state.forward = true;
				state.rotate = false;
			} else if (muteSensorState === RobotDetailCommandsMuteSensorsTypeEnum.BACK_MUTED) {
				state.backward = true;
				state.rotate = false;
			}
			setState(state);
		} else {
			setState({
				control: false,
				rotate: false,
				translate: false,
				forward: false,
				backward: false
			});
		}
	}, [controlMode, muteSensorState]);

	/**
	 * send control command
	 * @param payload
	 * @returns
	 */
	const sendControlCommand = (payload: RobotDetailCommandsPayloadInterface) => () => {
		// dispatch: send robot control command
		// dispatch: fetch robot twins of a robot
		Promise.all([
			dispatch(RobotControlCommandSend(robotTwin.robot.id, payload.command, payload.state)),
			dispatch(
				RobotTwinsFetch(
					robotTwin.id,
					true,
					AppConfigService.AppOptions.screens.robots.content.detail.commands.requestDelay
				)
			)
		])
			.then(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'command-control-success',
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `ROBOTS.DETAIL.COMMANDS.SUCCESS`
				};
				dispatch(GeneralTriggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: 'command-control-error',
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.COMMANDS.ERROR`
				};
				dispatch(GeneralTriggerMessage(message));
			});
	};

	return robotTwin ? (
		<Box className={classes.sCommandsContainer}>
			{/* Control */}
			<RobotDetailCommandControl
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
			<RobotDetailCommandActions state={state} sendControlCommand={sendControlCommand} />
		</Box>
	) : null;
};
export default RobotDetailCommands;
