import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../../../../services';

export const RobotContentDetailCameraStyles = makeStyles((theme: Theme) => ({
	sCameraContainer: {
		marginTop: theme.spacing(4)
	},
	sCameraTitle: {
		marginBottom: theme.spacing(1)
	},
	sCameraCard: {
		marginTop: theme.spacing(1)
	},
	sCameraCardImage: {
		display: 'block',
		maxHeight: 300,
		width: '100%'
	},
	sCameraButtonBox: {
		marginTop: theme.spacing(2)
	},
	sCameraButtonDisabled: {
		'&:disabled': {
			border: `${theme.typography.pxToRem(1)} solid ${
				AppConfigService.AppVariables.colors.c12
			}`,
			color: AppConfigService.AppVariables.colors.c12
		}
	}
}));
