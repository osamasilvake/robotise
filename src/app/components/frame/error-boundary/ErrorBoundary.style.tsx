import { Theme } from '@mui/material';

export const ErrorBoundaryStyle = (theme: Theme) => ({
	sTitle: {
		fontSize: theme.typography.pxToRem(75)
	},
	sDescription: {
		fontSize: theme.typography.pxToRem(20),
		lineHeight: 1.2,
		margin: `0 auto ${theme.spacing(1.5)}`,
		maxWidth: 500
	}
});
