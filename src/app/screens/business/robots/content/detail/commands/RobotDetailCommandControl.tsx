import { Box, Button, ButtonGroup, Chip, CircularProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { robotTwinsSelector } from '../../../../../../slices/robot-twins/RobotTwins.slice';
import { RobotDetailCommandsTypeEnum } from './RobotDetailCommands.enum';
import { RobotDetailCommandControlInterface } from './RobotDetailCommands.interface';
import { controlMode } from './RobotDetailCommands.map';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommandControl: FC<RobotDetailCommandControlInterface> = (props) => {
	const { robotTwin, robot, state, sendControlCommand } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyles();

	const robotTwins = useSelector(robotTwinsSelector);

	return (
		<Box>
			<Box className={classes.sCommandsControlLabel}>
				<Typography
					variant="h6"
					color="textSecondary"
					className={classes.sCommandsControlTitle}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.TITLE')}
				</Typography>

				<Box className={classes.sCommandsControlChips}>
					{!state.ready && (
						<Chip
							label={t('CONTENT.DETAIL.COMMANDS.CONTROL.CHIPS.ROBOT_OFF')}
							size="small"
							className={classes.sCommandsControlChipError}
						/>
					)}
					{robotTwin.joystickState?.controlMode.value && (
						<Chip
							label={t(controlMode(robotTwin.joystickState?.controlMode.value))}
							size="small"
						/>
					)}
				</Box>

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
					!state.ready ||
					state.forward ||
					state.backward ||
					robotTwins.loading ||
					robot.control.loading
				}>
				<Button
					className={clsx({
						['selected']: state.control
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_START
					})}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.STATE.ON')}
				</Button>
				<Button
					className={clsx({
						['selected']: !state.control
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_STOP
					})}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.STATE.OFF')}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default RobotDetailCommandControl;
