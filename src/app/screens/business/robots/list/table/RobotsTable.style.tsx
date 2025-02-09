import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight3;
export const RobotsListStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTableRowWarning: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c11, 0.15)
	},
	sTableRowDanger: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c12, 0.15)
	},
	sTableRowUrgent: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c9, 0.15)
	},
	sTableColumnTitle: {
		lineHeight: 0
	},
	sTableIcon: {
		cursor: 'help',
		marginLeft: theme.spacing(0.5)
	},
	sTableIconMoveTop: {
		marginTop: theme.spacing(-1)
	}
}));
