import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../services';

export const UploadStyle = makeStyles((theme: Theme) => ({
	sImageBackground: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c15, 0.7)
	},
	sImageUpload: {
		marginTop: theme.spacing(0.5)
	},
	sImageInfo: {
		marginTop: theme.spacing(1)
	},
	sImageInvalid: {
		color: AppConfigService.AppOptions.colors.c12
	}
}));
