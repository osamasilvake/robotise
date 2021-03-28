import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../../services';
import { RobotCameraRequestImage, robotSelector } from '../../../../../../slices/robot/Robot.slice';
import { robotTwinsSelector } from '../../../../../../slices/robot-twins/RobotTwins.slice';
import { useFallbackImg } from '../../../../../../utilities/hooks/fallbackImage/fallbackImage';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { robotCameraImageUrl } from '../../../Robots.url';
import { RobotContentDetailCameraInterface } from './RobotContentDetailCameras.interface';
import { RobotContentDetailCameraStyles } from './RobotContentDetailCameras.style';

const RobotContentDetailCamera: FC<RobotContentDetailCameraInterface> = (props) => {
	const { robot, imageType } = props;

	const { t } = useTranslation('ROBOTS');
	const robotContentDetailCameraClasses = RobotContentDetailCameraStyles();

	const dispatch = useDispatch();
	const sRobot = useSelector(robotSelector);
	const robotTwins = useSelector(robotTwinsSelector);

	const robotId = robotTwins.content?.data[0].robot.id || '';
	const cameraRobotTwins = robot.cameras ? robot.cameras[imageType] : null;
	const cameraRobot = sRobot.cameras[imageType];
	const cameraImage = useFallbackImg(
		robotCameraImageUrl(cameraRobotTwins?.imageId.value || ''),
		AppConfigService.AppImageURLs.logo.icon
	);

	/**
	 * dispatch: request robot image
	 * @param type
	 * @param id
	 */
	const handleRequestRobotImage = (type: string, id: string) => () =>
		dispatch(RobotCameraRequestImage(type, id));

	return (
		<Grid item xs={12} sm={6}>
			{/* Label */}
			<Typography variant="body1" color="textPrimary">
				{t(`CONTENT.DETAIL.CAMERAS.${imageType.toUpperCase()}`)}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat1(
					cameraRobot.content?.attributes?.updatedAt ||
						cameraRobotTwins?.imageId.updatedAt
				)}
			</Typography>

			{/* Card */}
			<Card square elevation={1} className={robotContentDetailCameraClasses.sCameraCard}>
				<CardContent>
					<img
						{...cameraImage}
						alt="camera"
						className={robotContentDetailCameraClasses.sCameraCardImage}
					/>
				</CardContent>
			</Card>

			{/* Button */}
			<Box className={robotContentDetailCameraClasses.sCameraButtonBox}>
				<Button
					variant="outlined"
					onClick={handleRequestRobotImage(imageType, robotId)}
					className={clsx({
						[robotContentDetailCameraClasses.sCameraButtonDisabled]: !robot.robotState
							.isReady.value
					})}
					disabled={cameraRobot.loading || !robot.robotState.isReady.value}
					endIcon={cameraRobot.loading && <CircularProgress size={20} />}>
					{robot.robotState.isReady.value && t('CONTENT.DETAIL.CAMERAS.REQUEST')}
					{!robot.robotState.isReady.value && t('CONTENT.DETAIL.CAMERAS.DISABLED')}
				</Button>
			</Box>
		</Grid>
	) : null;
};
export default RobotContentDetailCamera;
