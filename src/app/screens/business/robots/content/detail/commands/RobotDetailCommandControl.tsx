import { Box, Button, ButtonGroup, CircularProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { robotTwinsSelector } from '../../../../../../slices/robot-twins/RobotTwins.slice';
import { RobotDetailCommandsTypeEnum } from './RobotDetailCommands.enum';
import { RobotDetailCommandControlInterface } from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommandControl: FC<RobotDetailCommandControlInterface> = (props) => {
	const { robot, state, sendControlCommand } = props;
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
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_START
					})}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.ON')}
				</Button>
				<Button
					className={clsx({
						['selected']: !state.control
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.CONTROL_STOP
					})}>
					{t('CONTENT.DETAIL.COMMANDS.CONTROL.OFF')}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default RobotDetailCommandControl;
