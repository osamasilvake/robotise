import { makeStyles, Theme } from '@material-ui/core';

export const markdownStyles = makeStyles((theme: Theme) => ({
	markdownHeadingH1: {
		margin: theme.spacing(5, 0, 1.5)
	},
	markdownHeadingH6: {
		fontWeight: 600,
		margin: theme.spacing(4, 0, 1)
	},
	markdownHeadingBody1: {
		fontWeight: 500,
		margin: 0
	},
	MarkdownParagraph: {
		margin: theme.spacing(0, 0, 2)
	},
	markdownList: {
		margin: theme.spacing(0, 0, 2)
	},
	markdownListItem: {
		padding: 0
	}
}));
