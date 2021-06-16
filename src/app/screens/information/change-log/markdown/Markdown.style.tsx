import { makeStyles, Theme } from '@material-ui/core/styles';

export const MarkdownStyle = makeStyles((theme: Theme) => ({
	sCommon: {
		fontWeight: 500,
		margin: 0
	},
	sHeadingH1: {
		margin: theme.spacing(5, 0, 1.5)
	},
	sHeadingH2: {
		fontWeight: 600,
		margin: theme.spacing(4, 0, 1)
	},
	sHeadingH3: {
		fontWeight: 500,
		margin: theme.spacing(1.5, 0, 1)
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
