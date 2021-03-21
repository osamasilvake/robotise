import { makeStyles, Theme } from '@material-ui/core';

export const markdownStyles = makeStyles((theme: Theme) => ({
	sHeadingH1: {
		margin: theme.spacing(5, 0, 1.5)
	},
	sHeadingH2: {
		fontWeight: 600,
		margin: theme.spacing(4, 0, 1)
	},
	sCommon: {
		fontWeight: 500,
		margin: 0
	},
	MarkdownParagraph: {
		margin: theme.spacing(0, 0, 2)
	},
	sList: {
		margin: 0
	},
	sListItem: {
		padding: 0
	}
}));
