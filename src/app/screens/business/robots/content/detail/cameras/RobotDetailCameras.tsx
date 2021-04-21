import { Box, Grid, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import RobotDetailCamera from './RobotDetailCamera';
import { RobotDetailCameraTypeEnum } from './RobotDetailCameras.enum';
import { RobotDetailCamerasInterface } from './RobotDetailCameras.interface';
import { RobotDetailCameraStyles } from './RobotDetailCameras.style';

const RobotDetailCameras: FC<RobotDetailCamerasInterface> = (props) => {
	const { robotTwin } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCameraStyles();

	const [currentCameraType, setCurrentCameraType] = useState(RobotDetailCameraTypeEnum.BASE);

	return robotTwin?.cameras ? (
		<Box className={classes.sCamerasContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sCamerasTitle}>
				{t('CONTENT.DETAIL.CAMERAS.TITLE')}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				<RobotDetailCamera
					robotTwin={robotTwin}
					cameraType={RobotDetailCameraTypeEnum.BASE}
					currentCameraType={currentCameraType}
					setCurrentCameraType={setCurrentCameraType}
				/>
				<RobotDetailCamera
					robotTwin={robotTwin}
					cameraType={RobotDetailCameraTypeEnum.TOP}
					currentCameraType={currentCameraType}
					setCurrentCameraType={setCurrentCameraType}
				/>
			</Grid>
		</Box>
	) : null;
};
export default RobotDetailCameras;
