import { Box, Grid, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import RobotContentDetailCamera from './RobotContentDetailCamera';
import { RobotContentDetailCameraTypeEnum } from './RobotContentDetailCameras.enum';
import { RobotContentDetailCamerasInterface } from './RobotContentDetailCameras.interface';
import { RobotContentDetailCameraStyles } from './RobotContentDetailCameras.style';

const RobotContentDetailCameras: FC<RobotContentDetailCamerasInterface> = (props) => {
	const { robot, loading } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotContentDetailCameraStyles();

	const [currentCameraType, setCurrentCameraType] = useState(
		RobotContentDetailCameraTypeEnum.BASE
	);

	return robot?.cameras ? (
		<Box className={classes.sCamerasContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sCamerasTitle}>
				{t('CONTENT.DETAIL.CAMERAS.TITLE')}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				<RobotContentDetailCamera
					robot={robot}
					loading={loading}
					cameraType={RobotContentDetailCameraTypeEnum.BASE}
					currentCameraType={currentCameraType}
					setCurrentCameraType={setCurrentCameraType}
				/>
				<RobotContentDetailCamera
					robot={robot}
					loading={loading}
					cameraType={RobotContentDetailCameraTypeEnum.TOP}
					currentCameraType={currentCameraType}
					setCurrentCameraType={setCurrentCameraType}
				/>
			</Grid>
		</Box>
	) : null;
};
export default RobotContentDetailCameras;
