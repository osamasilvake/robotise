import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Typography
} from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Picture from '../../../../../../components/common/picture/Picture';
import { TriggerMessageTypeEnum } from '../../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../../components/frame/message/Message.interface';
import { AppConfigService } from '../../../../../../services';
import { GeneralTriggerMessage } from '../../../../../../slices/general/General.slice';
import {
	robotTwinsSelector,
	RobotTwinsSingleRobotFetchList
} from '../../../../../../slices/robot-twins/RobotTwins.slice';
import { momentFormat2 } from '../../../../../../utilities/methods/Moment';
import RobotsService from '../../../Robots.service';
import { robotCameraImageUrl } from '../../../Robots.url';
import { RobotContentDetailCameraTypeEnum } from './RobotContentDetailCameras.enum';
import { RobotContentDetailCameraInterface } from './RobotContentDetailCameras.interface';
import { RobotContentDetailCameraStyles } from './RobotContentDetailCameras.style';

const RobotContentDetailCamera: FC<RobotContentDetailCameraInterface> = (props) => {
	const { robot, loading, cameraType, currentCameraType, setCurrentCameraType } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotContentDetailCameraStyles();

	const dispatch = useDispatch();
	const robotTwins = useSelector(robotTwinsSelector);

	/**
	 * request for robot camera image
	 * fetch robot twins of single robot
	 * @param camera
	 */
	const handleRequestRobotImage = (camera: RobotContentDetailCameraTypeEnum) => async () => {
		// set selected camera
		setCurrentCameraType(camera);

		// api: request for robot camera image
		// dispatch: fetch robot twins of single robot
		Promise.all([
			RobotsService.robotRequestCameraImage(
				camera,
				robotTwins.content?.data[0].robot.id || ''
			),
			dispatch(
				RobotTwinsSingleRobotFetchList(
					robot.id,
					true,
					AppConfigService.AppOptions.screens.robots.content.detail.camera.requestDelay
				)
			)
		])
			.then(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `${camera}-success`,
					show: true,
					severity: TriggerMessageTypeEnum.SUCCESS,
					text: `ROBOT.CAMERAS.${camera.toUpperCase()}.SUCCESS`
				};
				dispatch(GeneralTriggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `${camera}-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOT.CAMERAS.${camera.toUpperCase()}.ERROR`
				};
				dispatch(GeneralTriggerMessage(message));
			});
	};

	return robot?.cameras && robot.cameras[cameraType] ? (
		<Grid item xs={12} sm={6}>
			{/* Label */}
			<Typography variant="body1" color="textPrimary">
				{t(`CONTENT.DETAIL.CAMERAS.${cameraType.toUpperCase()}`)}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat2(robot.cameras[cameraType].imageId.updatedAt)}
			</Typography>

			{/* Card Picture */}
			{robot.cameras[cameraType].imageId.value && (
				<Card square elevation={1} className={classes.sCameraCard}>
					<CardContent>
						<Picture
							src={robotCameraImageUrl(robot.cameras[cameraType].imageId.value)}
							alt="camera"
						/>
					</CardContent>
				</Card>
			)}

			{/* Button */}
			<Box className={classes.sCameraButtonBox}>
				<Button
					variant="outlined"
					onClick={handleRequestRobotImage(cameraType)}
					disabled={loading || !robot.robotState.isReady.value}
					endIcon={
						loading &&
						cameraType === currentCameraType && <CircularProgress size={20} />
					}>
					{robot.robotState.isReady.value && t('CONTENT.DETAIL.CAMERAS.REQUEST')}
					{!robot.robotState.isReady.value && t('CONTENT.DETAIL.CAMERAS.DISABLED')}
				</Button>
			</Box>
		</Grid>
	) : null;
};
export default RobotContentDetailCamera;
