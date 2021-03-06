import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../services';

export const loaderStyles = makeStyles((theme: Theme) => ({
	loaderAvatar: {
		height: theme.spacing(18),
		width: theme.spacing(18)
	},
	loaderSpinner: {
		color: AppConfigService.AppVariables.colors.c4
	}
}));
