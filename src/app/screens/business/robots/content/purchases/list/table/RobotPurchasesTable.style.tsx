import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight2;
export const RobotPurchasesTableStyles = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTablePagination: {
		opacity: 0.6,
		pointerEvents: 'none'
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
