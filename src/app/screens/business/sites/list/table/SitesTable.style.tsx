import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight3;
export const SitesListStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTableIcon: {
		color: alpha(AppConfigService.AppOptions.colors.c2, 0.95),
		cursor: 'help',
		marginLeft: theme.spacing(0.5)
	}
}));
