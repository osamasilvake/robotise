import { makeStyles, Theme } from '@material-ui/core';

export const markdownStyles = makeStyles((theme: Theme) => ({
	markdownHeading: {
		margin: theme.spacing(0),
		padding: theme.spacing(1, 0)
	},
	markdownHeading1: {},
	MarkdownParagraph: {
		margin: theme.spacing(2, 0)
	},
	markdownList: {
		margin: 0
	},
	markdownListItem: {
		padding: theme.spacing(0.4, 0)
	}
}));
