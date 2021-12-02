import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotDetailCommandsActionTypeEnum,
	RobotDetailCommandsTypeEnum
} from './RobotDetailCommands.enum';
import { RobotDetailCommandActionsInterface } from './RobotDetailCommands.interface';
import { rotateAngles, translateDistances } from './RobotDetailCommands.list';
import { RobotDetailCommandsStyle } from './RobotDetailCommands.style';

const RobotDetailCommandActions: FC<RobotDetailCommandActionsInterface> = (props) => {
	const { robot, state, sendControlCommand } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyle();

	const [rotate, setRotate] = useState(rotateAngles[4].value);
	const [translate, setTranslate] = useState(translateDistances[4].value);

	const translation = 'CONTENT.DETAIL.COMMANDS.ACTIONS';

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
				{t(`${translation}.TITLE`)}
			</Typography>
			<Box>
				<FormControl
					disabled={
						!state.ready ||
						!state.control ||
						state.forward ||
						state.backward ||
						robot.control.loading
					}
					className={classes.sCommandsActionSelect}>
					<InputLabel id="label-rotate">{t(`${translation}.ROTATE.LABEL`)}</InputLabel>
					<Select
						labelId="label-rotate"
						id="rotate"
						name="rotate"
						label={t(`${translation}.ROTATE.LABEL`)}
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
					className={classes.sCommandsActionButton}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.ROTATE,
						state: Number(rotate)
					})}
					disabled={
						rotate === rotateAngles[4].value ||
						!state.ready ||
						!state.control ||
						state.forward ||
						state.backward ||
						robot.control.loading
					}>
					{t(`${translation}.ROTATE.BUTTON`)}
				</Button>
			</Box>
			<Box className={classes.sCommandsActionTranslateBox}>
				<FormControl
					disabled={!state.ready || !state.control || robot.control.loading}
					className={classes.sCommandsActionSelect}>
					<InputLabel id="labe-translate">
						{t(`${translation}.TRANSLATE.LABEL`)}
					</InputLabel>
					<Select
						labelId="labe-translate"
						id="translate"
						name="translate"
						label={t(`${translation}.TRANSLATE.LABEL`)}
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
					className={classes.sCommandsActionButton}
					onClick={sendControlCommand({
						command: RobotDetailCommandsTypeEnum.TRANSLATE,
						state: Number(translate)
					})}
					disabled={
						translate === translateDistances[4].value ||
						!state.ready ||
						!state.control ||
						robot.control.loading
					}>
					{t(`${translation}.TRANSLATE.BUTTON`)}
				</Button>
			</Box>
		</Box>
	);
};
export default RobotDetailCommandActions;
