import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { AppConfigService } from '../../../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.contentHeight2;
export const RobotCommandsLogTableStyle = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
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
	sTableHistoryIcon: {
		fontSize: theme.typography.pxToRem(20),
		marginRight: theme.spacing(0.5)
	}
}));
