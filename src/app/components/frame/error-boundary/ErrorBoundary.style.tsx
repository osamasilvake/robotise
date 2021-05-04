import { Theme } from '@material-ui/core';

export const ErrorBoundaryStyles = (theme: Theme) => ({
	sTitle: {
		fontSize: theme.typography.pxToRem(75)
	},
	sDescription: {
		fontSize: theme.typography.pxToRem(20),
		lineHeight: 1.2,
		margin: `0 auto ${theme.spacing(1.5)}`,
		maxWidth: 500
	},
	sLink: {
		cursor: 'pointer',
		fontSize: theme.typography.pxToRem(17)
	}
});
