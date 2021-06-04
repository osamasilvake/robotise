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
import {
	RobotCommandCameraImageRequest,
	robotSelector
} from '../../../../../../slices/robots/Robot.slice';
import { momentFormat3 } from '../../../../../../utilities/methods/Moment';
import { robotCameraImageUrl } from '../../../Robots.url';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';
import { RobotDetailCameraInterface } from './RobotDetailCameras.interface';
import { RobotDetailCameraStyles } from './RobotDetailCameras.style';

const RobotDetailCamera: FC<RobotDetailCameraInterface> = (props) => {
	const { robotTwins, cameraType, currentCameraType, setCurrentCameraType } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCameraStyles();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

	/**
	 * request for robot camera image
	 * @param camera
	 */
	const handleRequestRobotImage = (camera: RobotDetailCameraTypeEnum) => async () => {
		// set selected camera
		setCurrentCameraType(camera);

		// dispatch: request robot camera image
		dispatch(RobotCommandCameraImageRequest(camera, robotTwins.robot.id || ''));
	};

	return (
		<Grid item xs={12} sm={6}>
			{/* Label */}
			<Typography variant="body1" color="textPrimary">
				{t(`CONTENT.DETAIL.CAMERAS.${cameraType}`)}
			</Typography>

			{/* Date */}
			{robotTwins.cameras && robotTwins.cameras[cameraType] && (
				<Typography variant="caption" color="textSecondary">
					{momentFormat3(robotTwins.cameras[cameraType].imageId.updatedAt)}
				</Typography>
			)}

			{/* Card Picture */}
			<Card square elevation={1} className={classes.sCameraCard}>
				<CardContent>
					<Picture
						src={robotCameraImageUrl(
							robotTwins.cameras &&
								robotTwins.cameras[cameraType] &&
								robotTwins.cameras[cameraType].imageId.value
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
					disabled={robot.camera.loading || !robotTwins.robotState.isReady.value}
					endIcon={
						robot.camera.loading &&
						cameraType === currentCameraType && <CircularProgress size={20} />
					}>
					{t('CONTENT.DETAIL.CAMERAS.REQUEST')}
				</Button>
			</Box>
		</Grid>
	);
};
export default RobotDetailCamera;
