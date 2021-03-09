import { makeStyles, Theme } from '@material-ui/core';

export const markdownStyles = makeStyles((theme: Theme) => ({
	markdownListItem: {
		marginTop: theme.spacing(1)
	},
	markdownHeader: {
		marginTop: theme.spacing(2)
	}
}));
