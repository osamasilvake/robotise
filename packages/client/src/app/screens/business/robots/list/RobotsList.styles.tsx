import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppConfigService } from '../../../../services';
import { pxToRem } from '../../../../utilities/methods/PixelsToRem';

const minusContentHeight = AppConfigService.AppOptions.components.table.minusContentHeight;
export const robotsListStyles = makeStyles((theme: Theme) => ({
	sTableMaxHeight: {
		maxHeight: `calc(100vh - ${minusContentHeight}px)`
	},
	sTableCellStatus: {
		borderRadius: pxToRem(4),
		color: AppConfigService.AppVariables.colors.c4,
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
