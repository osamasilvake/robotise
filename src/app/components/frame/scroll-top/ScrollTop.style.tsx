import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../services';

export const ScrollTopStyle = makeStyles((theme: Theme) => ({
	sScrollTop: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: AppConfigService.AppOptions.styles.zIndex.level2
	},
	sScrollTopIcon: {
		color: AppConfigService.AppOptions.colors.c7
	}
}));
