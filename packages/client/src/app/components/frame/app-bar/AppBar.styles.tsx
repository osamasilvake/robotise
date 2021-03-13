import { makeStyles, Theme } from '@material-ui/core';

import { AppConfigService } from '../../../services';

const drawerWidth = AppConfigService.AppOptions.drawer.width;
export const appBarStyles = makeStyles((theme: Theme) => ({
	sAppBar: {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		zIndex: theme.zIndex.drawer + 1
	},
	sOpen: {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		width: `calc(100% - ${drawerWidth}px)`
	},
	sToolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: theme.spacing(0, 2)
	},
	sOptions: {
		flexGrow: 1,
		textAlign: 'right'
	},
	sAccountDetail: {
		margin: theme.spacing(0, 1, 0, 0),
		textAlign: 'right'
	},
	sAccountDetailSubtitle: {
		marginTop: theme.spacing(-0.25)
	},
	sColorThemeLight: {
		fill: AppConfigService.AppVariables.colors.c11
	}
}));
