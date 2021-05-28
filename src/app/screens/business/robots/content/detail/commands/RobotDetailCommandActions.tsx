import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography
} from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotDetailCommandsActionTypeEnum,
	RobotDetailCommandsTypeEnum
} from './RobotDetailCommands.enum';
import { RobotDetailCommandActionsInterface } from './RobotDetailCommands.interface';
import { rotateAngles, translateDistances } from './RobotDetailCommands.list';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommandActions: FC<RobotDetailCommandActionsInterface> = (props) => {
	const { robot, state, sendControlCommand } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyles();

	const [rotate, setRotate] = useState(rotateAngles[4].value);
	const [translate, setTranslate] = useState(translateDistances[4].value);

	useEffect(() => {
		setRotate(rotateAngles[4].value);
		setTranslate(translateDistances[4].value);
	}, [state.control, state.forward, state.backward]);

	return (
		<Box>
			<Typography
				variant="subtitle2"
				color="textSecondary"
				className={classes.sCommandsActionTitle}>
				{t('CONTENT.DETAIL.COMMANDS.ACTIONS.TITLE')}
			</Typography>
			<Box>
				<FormControl
					variant="outlined"
					disabled={
						!state.ready ||
						!state.control ||
						state.forward ||
						state.backward ||
						robot.control.loading
					}
					className={classes.sCommandsActionSelect}>
					<InputLabel id="control-rotate">
						{t('CONTENT.DETAIL.COMMANDS.ACTIONS.ROTATE.LABEL')}
					</InputLabel>
					<Select
						labelId="control-rotate"
						id="rotate"
						name="rotate"
						label={t('CONTENT.DETAIL.COMMANDS.ACTIONS.ROTATE.LABEL')}
						value={rotate}
						onChange={(event) => setRotate(event.target.value)}>
						{rotateAngles.map((angle) => (
							<MenuItem key={angle.value} value={angle.value}>
								{angle.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button
					variant="outlined"
					disabled={
						rotate === rotateAngles[4].value ||
						!state.ready ||
						!state.control ||
						state.forward ||
						state.backward ||
						robot.control.loading
					}
					className={classes.sCommandsActionButton}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.ROTATE,
						state: Number(rotate)
					})}>
					{t('CONTENT.DETAIL.COMMANDS.ACTIONS.ROTATE.BUTTON')}
				</Button>
			</Box>
			<Box className={classes.sCommandsActionTranslateBox}>
				<FormControl
					variant="outlined"
					disabled={!state.ready || !state.control || robot.control.loading}
					className={classes.sCommandsActionSelect}>
					<InputLabel id="control-translate">
						{t('CONTENT.DETAIL.COMMANDS.ACTIONS.TRANSLATE.LABEL')}
					</InputLabel>
					<Select
						labelId="control-translate"
						id="translate"
						name="translate"
						label={t('CONTENT.DETAIL.COMMANDS.ACTIONS.TRANSLATE.LABEL')}
						value={translate}
						onChange={(event) => setTranslate(event.target.value)}>
						{translateDistances.map((distance) => (
							<MenuItem
								key={distance.value}
								value={distance.value}
								disabled={
									((distance.type === RobotDetailCommandsActionTypeEnum.FORWARD &&
										state.forward) ||
										(distance.type ===
											RobotDetailCommandsActionTypeEnum.BACKWARD &&
											state.backward)) &&
									distance.value !== 'none'
								}>
								{distance.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button
					variant="outlined"
					disabled={
						translate === translateDistances[4].value ||
						!state.ready ||
						!state.control ||
						robot.control.loading
					}
					className={classes.sCommandsActionButton}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.TRANSLATE,
						state: Number(translate)
					})}>
					{t('CONTENT.DETAIL.COMMANDS.ACTIONS.TRANSLATE.BUTTON')}
				</Button>
			</Box>
		</Box>
	);
};
export default RobotDetailCommandActions;
