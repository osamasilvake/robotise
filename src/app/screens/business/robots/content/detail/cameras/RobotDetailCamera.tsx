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
import { RobotCommandCameraImageRequest } from '../../../../../../slices/robot/Robot.slice';
import {
	RobotTwinsFetch,
	robotTwinsSelector
} from '../../../../../../slices/robot-twins/RobotTwins.slice';
import { momentFormat3 } from '../../../../../../utilities/methods/Moment';
import { robotCameraImageUrl } from '../../../Robots.url';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';
import { RobotDetailCameraInterface } from './RobotDetailCameras.interface';
import { RobotDetailCameraStyles } from './RobotDetailCameras.style';

const RobotDetailCamera: FC<RobotDetailCameraInterface> = (props) => {
	const { robotTwin, cameraType, currentCameraType, setCurrentCameraType } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCameraStyles();

	const dispatch = useDispatch();
	const robotTwins = useSelector(robotTwinsSelector);

	/**
	 * request for robot camera image
	 * fetch robot twins of single robot
	 * @param camera
	 */
	const handleRequestRobotImage = (camera: RobotDetailCameraTypeEnum) => async () => {
		// set selected camera
		setCurrentCameraType(camera);

		// dispatch: request robot camera image
		// dispatch: fetch robot twins of a robot
		Promise.all([
			dispatch(RobotCommandCameraImageRequest(camera, robotTwin.robot.id || '')),
			dispatch(
				RobotTwinsFetch(
					robotTwin.id,
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
					text: `ROBOTS.DETAIL.CAMERAS.${cameraType}.SUCCESS`
				};
				dispatch(GeneralTriggerMessage(message));
			})
			.catch(() => {
				// dispatch: trigger message
				const message: TriggerMessageInterface = {
					id: `${camera}-error`,
					show: true,
					severity: TriggerMessageTypeEnum.ERROR,
					text: `ROBOTS.DETAIL.CAMERAS.${cameraType}.ERROR`
				};
				dispatch(GeneralTriggerMessage(message));
			});
	};

	return (
		<Grid item xs={12} sm={6}>
			{/* Label */}
			<Typography variant="body1" color="textPrimary">
				{t(`CONTENT.DETAIL.CAMERAS.${cameraType}`)}
			</Typography>

			{/* Date */}
			{robotTwin.cameras && robotTwin.cameras[cameraType] && (
				<Typography variant="caption" color="textSecondary">
					{momentFormat3(robotTwin.cameras[cameraType].imageId.updatedAt)}
				</Typography>
			)}

			{/* Card Picture */}
			<Card square elevation={1} className={classes.sCameraCard}>
				<CardContent>
					<Picture
						src={robotCameraImageUrl(
							robotTwin.cameras &&
								robotTwin.cameras[cameraType] &&
								robotTwin.cameras[cameraType].imageId.value
						)}
						alt="camera"
					/>
				</CardContent>
			</Card>

			{/* Button */}
			<Box className={classes.sCameraButtonBox}>
				<Button
					variant="outlined"
					onClick={handleRequestRobotImage(cameraType)}
					disabled={robotTwins.loading || !robotTwin.robotState.isReady.value}
					endIcon={
						robotTwins.loading &&
						cameraType === currentCameraType && <CircularProgress size={20} />
					}>
					{t('CONTENT.DETAIL.CAMERAS.REQUEST')}
				</Button>
			</Box>
		</Grid>
	);
};
export default RobotDetailCamera;
