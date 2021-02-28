import { makeStyles } from '@material-ui/core/styles';

import { ConfigService } from '../../services';

export const loaderStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(18),
		height: theme.spacing(18)
	},
	spinner: {
		color: ConfigService.AppVariables.colors.c4
	}
}));
