import { Box, Button, ButtonGroup, CircularProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from './RobotDetailCommands.enum';
import { RobotDetailCommandControlInterface } from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommandControl: FC<RobotDetailCommandControlInterface> = (props) => {
	const { robotTwin, robot, state, sendControlCommand } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyles();

	return (
		<Box>
			<Box className={classes.sCommandsControlLabel}>
				<Typography
					variant="h6"
					color="textSecondary"
					className={classes.sCommandsControlTitle}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.TITLE')}
				</Typography>

				{robot.control.loading && (
					<Box component="span" className={classes.sCommandsControlLoading}>
						{<CircularProgress size={20} />}
					</Box>
				)}
			</Box>

			<ButtonGroup
				color="primary"
				variant="outlined"
				disabled={!state.ready || state.forward || state.backward || robot.control.loading}>
				<Button
					className={clsx({
						['selected']: state.control
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_MODE,
						state: RobotDetailControlModeTypeEnum.ROC_CONTROL
					})}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.STATE.ROC_CONTROL')}
				</Button>
				<Button
					className={clsx({
						['selected']:
							!state.control &&
							robotTwin.controlMode.value ===
								RobotDetailControlModeTypeEnum.AUTONOMOUS
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_MODE,
						state: RobotDetailControlModeTypeEnum.AUTONOMOUS
					})}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.STATE.AUTONOMOUS')}
				</Button>
				<Button
					className={clsx({
						['selected']:
							!state.control &&
							robotTwin.controlMode.value === RobotDetailControlModeTypeEnum.JOYSTICK
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_MODE,
						state: RobotDetailControlModeTypeEnum.JOYSTICK
					})}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.STATE.JOYSTICK')}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default RobotDetailCommandControl;
