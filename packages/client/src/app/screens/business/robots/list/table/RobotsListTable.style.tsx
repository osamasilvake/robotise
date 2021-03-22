import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../../services';

const minusContentHeight = AppConfigService.AppOptions.components.table.minusContentHeight;
export const robotsListStyles = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${theme.typography.pxToRem(minusContentHeight)})`
	},
	sTableCellStatus: {
		borderRadius: theme.typography.pxToRem(2),
		color: AppConfigService.AppVariables.colors.c7,
		padding: theme.spacing(0.2, 0.4)
	},
	sTableRowWarning: {
		backgroundColor: AppConfigService.AppVariables.colors.c11o
	},
	sTableRowDanger: {
		backgroundColor: AppConfigService.AppVariables.colors.c12o
	},
	sTableCellStatusOn: {
		backgroundColor: AppConfigService.AppVariables.colors.c10
	},
	sTableCellStatusOff: {
		backgroundColor: AppConfigService.AppVariables.colors.c12
	}
}));
