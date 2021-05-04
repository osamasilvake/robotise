import { Box, Button, ButtonGroup, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { TriggerMessageTypeEnum } from '../../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../../components/frame/message/Message.interface';
import { AppConfigService } from '../../../../../../services';
import { GeneralTriggerMessage } from '../../../../../../slices/general/General.slice';
import { RobotControlCommandSend } from '../../../../../../slices/robot/Robot.slice';
import {
	RobotTwinsFetch,
	robotTwinsSelector
} from '../../../../../../slices/robot-twins/RobotTwins.slice';
import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum
} from './RobotDetailCommands.enum';
import { RobotDetailCommandMuteSensorsInterface } from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommandMuteSensors: FC<RobotDetailCommandMuteSensorsInterface> = (props) => {
	const { robotTwin, robot, state } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyles();

	const dispatch = useDispatch();
	const robotTwins = useSelector(robotTwinsSelector);

	/**
	 * send control command
	 * @param state
	 * @returns
	 */
	const sendControlCommand = (state: string) => () => {
		// dispatch: send robot control command
		// dispatch: fetch robot twins of a robot
		Promise.all([
			dispatch(
				RobotControlCommandSend(
					robotTwin.robot.id,
					RobotDetailCommandsTypeEnum.MUTE_SENSORS,
					state
				)
			),
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

	return (
		<Box>
			<Typography
				variant="subtitle2"
				color="textSecondary"
				className={classes.sCommandsMuteTitle}>
				{t('CONTENT.DETAIL.COMMANDS.MUTE.TITLE')}
			</Typography>
			<ButtonGroup
				color="primary"
				variant="outlined"
				disabled={!state.control || robotTwins.loading || robot.control.loading}>
				{/* Front */}
				<Button
					className={clsx({
						['selected']: state.forward
					})}
					onClick={sendControlCommand(RobotDetailCommandsMuteSensorsTypeEnum.FRONT_MUTED)}
					disabled={state.forward || state.backward}>
					{t('CONTENT.DETAIL.COMMANDS.MUTE.FRONT')}
				</Button>

				{/* Back */}
				<Button
					className={clsx({
						['selected']: state.backward
					})}
					onClick={sendControlCommand(RobotDetailCommandsMuteSensorsTypeEnum.BACK_MUTED)}
					disabled={state.forward || state.backward}>
					{t('CONTENT.DETAIL.COMMANDS.MUTE.BACK')}
				</Button>

				{/* Nothing */}
				<Button
					onClick={sendControlCommand(
						RobotDetailCommandsMuteSensorsTypeEnum.NOTHING_MUTED
					)}>
					{t('CONTENT.DETAIL.COMMANDS.MUTE.UN_MUTE')}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default RobotDetailCommandMuteSensors;
