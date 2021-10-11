import { Box, Button, ButtonGroup, CircularProgress, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotDetailCommandsTypeEnum,
	RobotDetailControlModeTypeEnum
} from './RobotDetailCommands.enum';
import { RobotDetailCommandControlInterface } from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyle } from './RobotDetailCommands.style';

const RobotDetailCommandControl: FC<RobotDetailCommandControlInterface> = (props) => {
	const { robotTwins, robot, state, sendControlCommand } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyle();

	const translation = 'CONTENT.DETAIL.COMMANDS.CONTROL';

	return (
		<Box>
			<Box className={classes.sCommandsControlLabel}>
				<Typography
					variant="h6"
					color="textSecondary"
					className={classes.sCommandsControlTitle}>
					{t(`${translation}.TITLE`)}
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
					{t(`${translation}.STATE.ROC_CONTROL`)}
				</Button>
				<Button
					className={clsx({
						['selected']:
							!state.control &&
							robotTwins.controlMode.value ===
								RobotDetailControlModeTypeEnum.AUTONOMOUS
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_MODE,
						state: RobotDetailControlModeTypeEnum.AUTONOMOUS
					})}>
					{t(`${translation}.STATE.AUTONOMOUS`)}
				</Button>
				<Button
					className={clsx({
						['selected']:
							!state.control &&
							robotTwins.controlMode.value === RobotDetailControlModeTypeEnum.JOYSTICK
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_MODE,
						state: RobotDetailControlModeTypeEnum.JOYSTICK
					})}>
					{t(`${translation}.STATE.JOYSTICK`)}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default RobotDetailCommandControl;
