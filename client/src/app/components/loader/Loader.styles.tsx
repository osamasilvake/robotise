import { makeStyles } from '@material-ui/core/styles';

import { AppVariables } from '../../../app.config';

export const loaderStyles = makeStyles((theme) => ({
	avatar: {
		width: theme.spacing(18),
		height: theme.spacing(18)
	},
	spinner: {
		color: AppVariables.colors.c4
	}
}));
