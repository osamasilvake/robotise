import { alpha, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight1;
export const AlertCodesTableStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTableRowWarning: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c11, 0.15)
	},
	sTableRowDanger: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c12, 0.15)
	},
	sTablePagination: {
		opacity: 0.6,
		pointerEvents: 'none'
	}
}));
