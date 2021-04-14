import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../services';

const linearWidth = AppConfigService.AppOptions.components.loader.linear.width;
export const LoaderStyles = makeStyles((theme: Theme) => ({
	sLinear: {
		margin: theme.spacing(15, 'auto', 0),
		width: theme.typography.pxToRem(linearWidth)
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
		color: AppConfigService.AppOptions.colors.c9
	}
}));
