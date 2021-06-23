import { makeStyles, Theme } from '@material-ui/core/styles';

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
	}
}));
