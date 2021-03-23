import { fade, makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.minusContentHeight;
export const RobotsListStyles = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTableCellStatus: {
		borderRadius: theme.typography.pxToRem(2),
		color: AppConfigService.AppVariables.colors.c7,
		padding: theme.spacing(0.2, 0.4)
	},
	sTableRowWarning: {
		backgroundColor: fade(AppConfigService.AppVariables.colors.c11, 0.15)
	},
	sTableRowDanger: {
		backgroundColor: fade(AppConfigService.AppVariables.colors.c12, 0.15)
	},
	sTableCellStatusOn: {
		backgroundColor: AppConfigService.AppVariables.colors.c10
	},
	sTableCellStatusOff: {
		backgroundColor: AppConfigService.AppVariables.colors.c12
	}
}));
