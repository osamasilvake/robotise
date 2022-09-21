import { Box, Button } from '@mui/material';
import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { RobotRemoteSafetyResetCommandSend } from '../../../../../../slices/business/robots/RobotOperations.slice';
import { RobotDetailRemoteSafetyResetButtonTypeEnum } from './RobotDetailRemoteSafetyReset.enum';
import { RobotDetailRemoteSafetyResetButtonInterface } from './RobotDetailRemoteSafetyReset.interface';
import { RobotDetailRemoteSafetyResetStyle } from './RobotDetailRemoteSafetyReset.style';

const RobotDetailRemoteSafetyResetButton: FC<RobotDetailRemoteSafetyResetButtonInterface> = (
	props
) => {
	const { robotId, buttonClass, event, setHoldConfirm, disabled, children } = props;
	const classes = RobotDetailRemoteSafetyResetStyle();

	const dispatch = useDispatch<AppDispatch>();

	const buttonRef = useRef<number>();

	const detail = AppConfigService.AppOptions.screens.business.robots.content.detail;
	const duration = detail.remoteSafetyReset.duration;
	const durationReverse = detail.remoteSafetyReset.reverseDuration;
	const isPress = RobotDetailRemoteSafetyResetButtonTypeEnum.PRESS === buttonClass;

	useEffect(() => {
		const button = document.querySelector(`.${buttonClass}`) as HTMLButtonElement;

		// press
		button.onmousedown = () => {
			// remove property: --duration
			button.style.setProperty('--duration', duration + 'ms');

			// set property: --progress-array
			button.style.setProperty('--progress-array', '52');

			// clear timeout
			clearTimeout(buttonRef.current);

			// set timeout
			buttonRef.current = window.setTimeout(success, duration, button);

			// dispatch: send remote safety reset command
			dispatch(
				RobotRemoteSafetyResetCommandSend(robotId, {
					event,
					buttonPressed: true
				})
			);
		};

		// release
		button.onmouseup = () => {
			// set property: --duration
			button.style.setProperty('--duration', durationReverse + 'ms');

			// remove property: --progress-array
			button.style.removeProperty('--progress-array');

			// set: hold confirm
			setHoldConfirm(!isPress);

			// clear timeout
			clearTimeout(buttonRef.current);

			// dispatch: send remote safety reset command
			dispatch(
				RobotRemoteSafetyResetCommandSend(robotId, {
					event,
					buttonPressed: false
				})
			);
		};

		/**
		 * success
		 * @param button
		 */
		const success = async (button: HTMLButtonElement) => {
			// add class: success
			button.classList.add('success');

			// remove property: --duration
			button.style.removeProperty('--duration');

			// remove property: --progress-array
			button.style.removeProperty('--progress-array');
		};
	}, [dispatch, duration, durationReverse, robotId, setHoldConfirm, buttonClass, event, isPress]);

	return (
		<Button
			variant="contained"
			className={buttonClass}
			disabled={disabled}
			disableFocusRipple
			disableRipple
			disableElevation>
			{/* Progress */}
			{!disabled && (
				<Box className={classes.sButtonSVGMain}>
					<svg
						className={clsx(classes.sButtonSVG, classes.sButtonSVGProgress)}
						viewBox="0 0 32 32">
						<circle className={classes.sButtonSVGCircle} r="8" cx="16" cy="16" />
					</svg>
				</Box>
			)}

			{children}
		</Button>
	);
};
export default RobotDetailRemoteSafetyResetButton;
