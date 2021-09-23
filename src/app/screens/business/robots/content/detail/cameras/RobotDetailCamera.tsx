import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Picture from '../../../../../../components/common/picture/Picture';
import {
	RobotCameraCommandRequest,
	robotSelector
} from '../../../../../../slices/business/robots/Robot.slice';
import { momentFormat2 } from '../../../../../../utilities/methods/Moment';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { robotCameraImageUrl } from '../../../Robots.url';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';
import { RobotDetailCameraInterface } from './RobotDetailCameras.interface';
import { RobotDetailCameraStyle } from './RobotDetailCameras.style';

const RobotDetailCamera: FC<RobotDetailCameraInterface> = (props) => {
	const { robotTwins, cameraType, currentCameraType, setCurrentCameraType } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCameraStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

	const translation = 'CONTENT.DETAIL.CAMERAS';

	/**
	 * request for robot camera image
	 * @param camera
	 */
	const handleRequestRobotImage = (camera: RobotDetailCameraTypeEnum) => async () => {
		// set selected camera
		setCurrentCameraType(camera);

		// dispatch: request robot camera command
		dispatch(RobotCameraCommandRequest(camera, robotTwins.robot.id || ''));
	};

	return (
		<Grid item xs={12} sm={6}>
			{/* Label */}
			<Typography color="textPrimary">{t(`${translation}.${cameraType}`)}</Typography>

			{/* Date */}
			{robotTwins.cameras && robotTwins.cameras[cameraType] && (
				<Typography variant="caption" color="textSecondary">
					{momentFormat2(robotTwins.cameras[cameraType].imageId.updatedAt)}
				</Typography>
			)}

			{/* Card Picture */}
			<Card square elevation={1} className={classes.sCameraCard}>
				<CardContent className={cardClasses.sCardContent0}>
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
					{t(`${translation}.REQUEST`)}
				</Button>
			</Box>
		</Grid>
	);
};
export default RobotDetailCamera;
