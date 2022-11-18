import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight2;
export const GeneralAllPhoneCallsTableStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTablePagination: {
		opacity: 0.6,
		pointerEvents: 'none'
	},
	sTableRowWarning: {
		backgroundColor: alpha(AppConfigService.AppOptions.colors.c11, 0.15)
	},
	sLightRow: {
		opacity: 0.3
	},
	sTableHistory: {
		'&:not(:last-child)': {
			marginBottom: theme.spacing(0.5)
		}
	},
	sHistoryEvent: {
		marginRight: theme.spacing(0.5)
	},
	sHistoryDetails: {
		marginRight: theme.spacing(0.8)
	},
	sTableHistoryIcon: {
		fontSize: theme.typography.pxToRem(20),
		marginRight: theme.spacing(0.5)
	}
}));
