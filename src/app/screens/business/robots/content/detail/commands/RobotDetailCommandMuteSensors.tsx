import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotDetailCommandsMuteSensorsTypeEnum,
	RobotDetailCommandsTypeEnum
} from './RobotDetailCommands.enum';
import { RobotDetailCommandMuteSensorsInterface } from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyle } from './RobotDetailCommands.style';

const RobotDetailCommandMuteSensors: FC<RobotDetailCommandMuteSensorsInterface> = (props) => {
	const { robot, state, sendControlCommand } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyle();

	const translation = 'CONTENT.DETAIL.COMMANDS.MUTE';

	return (
		<Box>
			<Typography
				variant="subtitle2"
				color="textSecondary"
				className={classes.sCommandsMuteTitle}>
				{t(`${translation}.TITLE`)}
			</Typography>
			<ButtonGroup
				color="primary"
				variant="outlined"
				disabled={!state.ready || !state.control || robot.control.loading}>
				{/* Front */}
				<Button
					className={clsx({
						['selected']: state.forward
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.MUTE_SENSORS,
						state: RobotDetailCommandsMuteSensorsTypeEnum.FRONT_MUTED
					})}
					disabled={state.forward || state.backward}>
					{t(`${translation}.FRONT`)}
				</Button>

				{/* Back */}
				<Button
					className={clsx({
						['selected']: state.backward
					})}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.MUTE_SENSORS,
						state: RobotDetailCommandsMuteSensorsTypeEnum.BACK_MUTED
					})}
					disabled={state.forward || state.backward}>
					{t(`${translation}.BACK`)}
				</Button>

				{/* Nothing */}
				<Button
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.MUTE_SENSORS,
						state: RobotDetailCommandsMuteSensorsTypeEnum.NOTHING_MUTED
					})}>
					{t(`${translation}.UN_MUTE`)}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default RobotDetailCommandMuteSensors;
