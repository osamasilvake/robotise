import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../services';

const linearWidth = AppConfigService.AppOptions.loader.linear.width;
export const loaderStyles = makeStyles((theme: Theme) => ({
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
	sAvatar: {
		height: theme.spacing(18),
		margin: theme.spacing(0, 'auto'),
		width: theme.spacing(18)
	},
	sCircularLoader: {
		color: AppConfigService.AppVariables.colors.c9
	}
}));
