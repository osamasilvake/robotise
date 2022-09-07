import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight4;
export const GeneralAllOrdersTableStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTableRowWarning: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c11, 0.15)
	},
	sTablePagination: {
		opacity: 0.6,
		pointerEvents: 'none'
	},
	sCancelOrder: {
		marginLeft: theme.spacing(1)
	},
	sRestartOrder: {
		marginLeft: theme.spacing(0.25)
	}
}));
