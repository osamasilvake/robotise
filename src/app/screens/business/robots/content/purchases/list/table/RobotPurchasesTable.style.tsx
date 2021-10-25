import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

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
	sCommentEdit: {
		marginBottom: theme.spacing(0.5)
	},
	sItemTrackingVisit: {
		marginLeft: theme.spacing(0.5)
	}
}));
