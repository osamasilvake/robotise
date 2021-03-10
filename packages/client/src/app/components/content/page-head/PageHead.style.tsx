import { makeStyles, Theme } from '@material-ui/core';

export const pageHeadStyles = makeStyles((theme: Theme) => ({
	pageHead: {
		padding: theme.spacing(1.3, 1.6)
	},
	pageHeadTitle: {
		marginBottom: theme.spacing(0.6)
	},
	pageHeadBreadcrumbLink: {
		display: 'flex'
	},
	pageHeadBreadcrumbLinkIcon: {
		height: 20,
		marginRight: theme.spacing(0.5),
		width: 20
	}
}));
