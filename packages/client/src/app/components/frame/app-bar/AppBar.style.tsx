import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../services';

const drawerWidth = AppConfigService.AppOptions.components.drawer.width;
export const AppBarStyles = makeStyles((theme: Theme) => ({
	sAppBar: {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		zIndex: theme.zIndex.drawer + 1
	},
	sOpen: {
		marginLeft: theme.typography.pxToRem(drawerWidth),
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: `calc(100% - ${theme.typography.pxToRem(drawerWidth)})`
	},
	sToolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: theme.spacing(0, 2)
	},
	sLogo: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	sOpenIcon: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	sOptions: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'flex-end',
		flexGrow: 1,
		textAlign: 'right'
	},
	sAccountDetail: {
		margin: theme.spacing(0, 1, 0, 0),
		textAlign: 'right'
	},
	sAccountDetailSubtitle: {
		marginTop: theme.spacing(-0.25)
	}
}));
