import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../../../../../services';

export const SiteProductsActionsStyle = makeStyles((theme: Theme) => ({
	sSpeedDial: {
		position: 'absolute',
		bottom: 0,
		left: 0
	},
	sSpeedDialIcon: {
		color: AppConfigService.AppOptions.colors.c7
	},
	sDownloadLink: {
		alignItems: 'center',
		color: AppConfigService.AppOptions.colors.c9,
		display: 'inline-flex',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
	},
	sDownloadIcon: {
		marginRight: theme.spacing(0.7)
	}
}));
