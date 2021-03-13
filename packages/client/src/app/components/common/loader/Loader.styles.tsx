import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../services';

const linearWidth = AppConfigService.AppOptions.loader.linear.width;
export const loaderStyles = makeStyles((theme: Theme) => ({
	sAvatar: {
		height: theme.spacing(18),
		width: theme.spacing(18)
	},
	sLinear: {
		margin: theme.spacing(15, 'auto', 0),
		width: linearWidth
	},
	sLinearText: {
		marginBottom: theme.spacing(1)
	},
	sCircularAvatar: {
		marginBottom: theme.spacing(2)
	},
	sCircularLoader: {
		color: AppConfigService.AppVariables.colors.c9
	}
}));
