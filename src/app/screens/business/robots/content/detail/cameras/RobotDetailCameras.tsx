import { Box, Grid, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import RobotDetailCamera from './RobotDetailCamera';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';
import { RobotDetailCamerasInterface } from './RobotDetailCameras.interface';
import { RobotDetailCameraStyle } from './RobotDetailCameras.style';

const RobotDetailCameras: FC<RobotDetailCamerasInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCameraStyle();

	const [currentCameraType, setCurrentCameraType] = useState(RobotDetailCameraTypeEnum.BASE);

	return (
		<Box className={classes.sCamerasContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sCamerasTitle}>
				{t('CONTENT.DETAIL.CAMERAS.TITLE')}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				<RobotDetailCamera
					robotTwins={robotTwins}
					cameraType={RobotDetailCameraTypeEnum.BASE}
					currentCameraType={currentCameraType}
					setCurrentCameraType={setCurrentCameraType}
				/>
				<RobotDetailCamera
					robotTwins={robotTwins}
					cameraType={RobotDetailCameraTypeEnum.TOP}
					currentCameraType={currentCameraType}
					setCurrentCameraType={setCurrentCameraType}
				/>
			</Grid>
		</Box>
	);
};
export default RobotDetailCameras;
