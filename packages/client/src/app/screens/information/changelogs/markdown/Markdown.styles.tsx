import { makeStyles, Theme } from '@material-ui/core';

export const markdownStyles = makeStyles((theme: Theme) => ({
	markdownHeading: {
		padding: theme.spacing(3, 0)
	},
	markdownHeadingH1: {
		margin: theme.spacing(3, 0, 1.5)
	},
	markdownHeadingH6: {
		fontWeight: 500,
		margin: theme.spacing(1, 0, 0)
	},
	markdownHeadingBody1: {
		margin: 0
	},
	MarkdownParagraph: {
		margin: theme.spacing(0, 0, 2)
	},
	markdownList: {
		margin: 0
	},
	markdownListItem: {
		padding: 0
	}
}));
