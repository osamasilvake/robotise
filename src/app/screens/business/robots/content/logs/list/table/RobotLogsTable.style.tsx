import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import { AppConfigService } from '../../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight2;
export const RobotLogsTableStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTablePagination: {
		opacity: 0.6,
		pointerEvents: 'none'
	},
	sTableHistoryFlex: {
		display: 'flex'
	},
	sTableHistoryIcon: {
		fontSize: theme.typography.pxToRem(20),
		marginRight: theme.spacing(0.5)
	}
}));
