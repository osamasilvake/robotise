import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../services';

const drawerWidth = AppConfigService.AppOptions.drawer.width;
export const appBarStyles = makeStyles((theme: Theme) => ({
	appBar: {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		zIndex: theme.zIndex.drawer + 1
	},
	appBarOpen: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: `calc(100% - ${drawerWidth}px)`
	},
	appBarToolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: theme.spacing(0, 2)
	},
	appBarOptions: {
		alignItems: 'center',
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'flex-end',
		textAlign: 'right'
	},
	appBarColorThemeLight: {
		fill: AppConfigService.AppVariables.colors.c10
	},
	appBarDivider: {
		margin: theme.spacing(0, 0, 0, 0.5)
	},
	appBarAccountDetail: {
		margin: theme.spacing(0, 1, 0, 0),
		textAlign: 'right'
	},
	appBarAccountDetailSubtitle: {
		marginTop: theme.spacing(-0.25)
	}
}));
