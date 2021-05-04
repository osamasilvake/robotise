import { Box, Button, ButtonGroup, CircularProgress, Typography } from '@material-ui/core';
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
import { RobotDetailCommandsTypeEnum } from './RobotDetailCommands.enum';
import { RobotDetailCommandControlInterface } from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommandControl: FC<RobotDetailCommandControlInterface> = (props) => {
	const { robotTwin, robot, state } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyles();

	const dispatch = useDispatch();
	const robotTwins = useSelector(robotTwinsSelector);

	/**
	 * send control command
	 * @param status
	 * @returns
	 */
	const sendControlCommand = (status: boolean) => () => {
		// dispatch: send robot control command
		// dispatch: fetch robot twins of a robot
		const value = status
			? RobotDetailCommandsTypeEnum.CONTROL_START
			: RobotDetailCommandsTypeEnum.CONTROL_STOP;
		Promise.all([
			dispatch(RobotControlCommandSend(robotTwin.robot.id, value)),
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
			<Box className={classes.sCommandsControlLabel}>
				<Typography
					variant="h6"
					color="textSecondary"
					className={classes.sCommandsControlTitle}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.TITLE')}
				</Typography>

				{(robotTwins.loading || robot.control.loading) && (
					<Box component="span" className={classes.sCommandsControlLoading}>
						{<CircularProgress size={20} />}
					</Box>
				)}
			</Box>

			<ButtonGroup
				color="primary"
				variant="outlined"
				disabled={
					state.forward || state.backward || robotTwins.loading || robot.control.loading
				}>
				<Button
					className={clsx({
						['selected']: state.control
					})}
					onClick={sendControlCommand(true)}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.ON')}
				</Button>
				<Button
					className={clsx({
						['selected']: !state.control
					})}
					onClick={sendControlCommand(false)}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.OFF')}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default RobotDetailCommandControl;
