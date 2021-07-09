import { alpha, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight2;
export const RobotPurchasesTableStyle = makeStyles((theme: Theme) => ({
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
	sTarget: {
		marginLeft: theme.spacing(2)
	},
	sCommentTextField: {
		marginBottom: theme.spacing(1)
	},
	sCommentCancel: {
		marginRight: theme.spacing(0.5)
	},
	sCommentClear: {
		marginRight: theme.spacing(0.5)
	},
	sCommentValue: {
		marginTop: theme.spacing(0.5),
		whiteSpace: 'pre-wrap'
	}
}));
