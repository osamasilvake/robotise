import { makeStyles } from '@material-ui/core/styles';

import AppConfig from '../../../app.config';

export const loaderStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(18),
		height: theme.spacing(18)
	},
	spinner: {
		color: AppConfig.AppVariables.colors.c4
	}
}));
