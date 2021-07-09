import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

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
