import { makeStyles, Theme } from '@material-ui/core';

export const scrollTopStyles = makeStyles((theme: Theme) => ({
	scrollTop: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2)
	}
}));
