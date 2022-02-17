import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../services';

const drawerOpenWidth = AppConfigService.AppOptions.components.drawer.openWidth;
export const AccountStyle = makeStyles((theme: Theme) => ({
	sAccount: {
		minHeight: theme.spacing(8),
		padding: theme.spacing(0, 1)
	},
	sAvatar: {
		width: '100%'
	},
	sButton: {
		borderRadius: theme.typography.pxToRem(2)
	},
	sDetail: {
		margin: theme.spacing(0, 0, 0, 1),
		maxWidth: theme.typography.pxToRem(125),
		textAlign: 'left'
	},
	sDetailSubtitle: {
		marginTop: theme.spacing(-0.25)
	},
	sList: {
		maxWidth: `calc(${theme.typography.pxToRem(drawerOpenWidth)} - ${theme.spacing(4)})`
	}
}));
