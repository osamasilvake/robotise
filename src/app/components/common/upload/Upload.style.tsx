import { alpha, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../services';

export const UploadStyle = makeStyles((theme: Theme) => ({
	sImageUpload: {
		marginTop: theme.spacing(0.5)
	},
	sImageInfo: {
		marginTop: theme.spacing(1)
	},
	sImageInvalid: {
		color: AppConfigService.AppOptions.colors.c12
	},
	sImageBackground: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c15, 0.7)
	}
}));
