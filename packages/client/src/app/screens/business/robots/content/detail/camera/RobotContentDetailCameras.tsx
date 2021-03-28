import { Box, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import RobotContentDetailCamera from './RobotContentDetailCamera';
import { RobotContentDetailCameraTypeEnum } from './RobotContentDetailCameras.enum';
import { RobotContentDetailCamerasInterface } from './RobotContentDetailCameras.interface';
import { RobotContentDetailCameraStyles } from './RobotContentDetailCameras.style';

const RobotContentDetailCameras: FC<RobotContentDetailCamerasInterface> = (props) => {
	const { robot } = props;

	const { t } = useTranslation('ROBOTS');
	const robotContentDetailCameraClasses = RobotContentDetailCameraStyles();

	return (
		<Box className={robotContentDetailCameraClasses.sCameraContainer}>
			{/* Title */}
			<Typography
				variant="h6"
				color="textSecondary"
				className={robotContentDetailCameraClasses.sCameraTitle}>
				{t('CONTENT.DETAIL.CAMERAS.TITLE')}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				<RobotContentDetailCamera
					robot={robot}
					imageType={RobotContentDetailCameraTypeEnum.BASE}
				/>
				<RobotContentDetailCamera
					robot={robot}
					imageType={RobotContentDetailCameraTypeEnum.TOP}
				/>
			</Grid>
		</Box>
	);
};
export default RobotContentDetailCameras;
