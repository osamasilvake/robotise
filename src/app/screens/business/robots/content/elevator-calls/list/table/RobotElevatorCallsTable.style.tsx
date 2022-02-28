import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight4;
export const RobotElevatorCallsTableStyle = makeStyles((theme: Theme) => ({
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
	sTableHistory: {
		'&:not(:last-child)': {
			marginBottom: theme.spacing(0.5)
		}
	},
	sHistoryEvent: {
		marginRight: theme.spacing(0.5)
	},
	sTableHistoryIcon: {
		fontSize: theme.typography.pxToRem(20),
		marginRight: theme.spacing(0.5)
	},
	sTableTemplateIcon: {
		letterSpacing: theme.spacing(0.07),
		marginTop: theme.spacing(0.5)
	}
}));
