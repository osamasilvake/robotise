import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const RobotDetailCameraStyle = makeStyles((theme: Theme) => ({
	sCamerasContainer: {
		marginTop: theme.spacing(4)
	},
	sCamerasTitle: {
		marginBottom: theme.spacing(1)
	},
	sCameraCard: {
		marginTop: theme.spacing(1)
	},
	sCameraButtonBox: {
		marginTop: theme.spacing(2)
	}
}));
